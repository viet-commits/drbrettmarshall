#!/bin/bash
# Daily health check for drbrettmarshall.com.au
SITE="${1:-https://drbrettmarshall.pages.dev}"
TIMESTAMP=$(date -Iseconds)
FAILURES=0

check() {
  local path="$1" desc="$2" expect="$3"
  local code
  code=$(curl -sL -o /tmp/hc-$$.html -w "%{http_code}" --max-time 15 "${SITE}${path}" 2>/dev/null)
  if [ "$code" != "200" ]; then
    echo "❌ [$TIMESTAMP] $desc ($path): HTTP $code"
    FAILURES=$((FAILURES + 1))
    return 1
  fi
  if [ -n "$expect" ] && ! grep -q "$expect" /tmp/hc-$$.html 2>/dev/null; then
    echo "❌ [$TIMESTAMP] $desc ($path): missing '$expect'"
    FAILURES=$((FAILURES + 1))
    return 1
  fi
  echo "✅ [$TIMESTAMP] $desc: HTTP 200 ($(wc -c < /tmp/hc-$$.html) bytes)"
}

echo "🏥 Dr Brett Marshall — Health Check — $(date)"
check "/" "Homepage" "obstetrician"
check "/about" "About" "Peninsula"
check "/contact" "Contact" "9776 6411"
check "/our-services" "Services" "Endometriosis"
check "/services/endometriosis" "Endometriosis" "endometrial"
check "/frequently-asked-questions-faq" "FAQs" "appointment"
check "/images/logo.png" "Logo" ""

if [ "$FAILURES" -eq 0 ]; then
  echo "🟢 All 7 checks passed"
else
  echo "🔴 $FAILURES failed"
fi
rm -f /tmp/hc-$$.html
