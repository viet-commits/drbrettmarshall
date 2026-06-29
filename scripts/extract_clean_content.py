#!/usr/bin/env python3
"""Extract clean text content from scraped WordPress HTML."""
import re, json, html as html_mod

with open("data/content.ts", "r") as f:
    raw = f.read()

# Extract the pages object
pages_match = re.search(r'const pages = ({.*?});', raw, re.DOTALL)
services_match = re.search(r'const services = ({.*?});', raw, re.DOTALL)

def clean_html(html_str):
    """Strip HTML tags, decode entities, normalize whitespace."""
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', ' ', html_str)
    # Decode HTML entities
    text = html_mod.unescape(text)
    # Remove WP shortcodes
    text = re.sub(r'\[/?vc_[^\]]*\]', '', text)
    text = re.sub(r'\[[^\]]+\]', '', text)
    # Normalize whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    # Remove JSON escape sequences
    text = text.replace('\\n', '\n').replace('\\t', '  ').replace('\\"', '"')
    return text

def parse_key_values(match_text):
    """Parse a JS object {...} with string keys and string values."""
    result = {}
    # Match "key": "value" or "key": {...} patterns
    current_pos = 0
    depth = 0
    in_string = False
    escape = False
    key = None
    val_start = None
    
    # Simpler approach: use regex to find all top-level "key": {...}
    # Find all key names at the top level
    for m in re.finditer(r'"([^"]+)":\s*{', match_text):
        key = m.group(1)
        start = m.end() - 1  # position of {
        # Find matching }
        depth = 1
        pos = start + 1
        while depth > 0 and pos < len(match_text):
            c = match_text[pos]
            if c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
            pos += 1
        obj = match_text[start:pos]
        # Extract title and content from object
        title_m = re.search(r'"title":\s*"((?:[^"\\]|\\.)*)"', obj)
        content_m = re.search(r'"content":\s*"((?:[^"\\]|\\.)*)"', obj)
        meta_m = re.search(r'"meta":\s*"((?:[^"\\]|\\.)*)"', obj)
        
        result[key] = {
            "title": html_mod.unescape(title_m.group(1)) if title_m else key,
            "content": clean_html(content_m.group(1)) if content_m else "",
            "meta": html_mod.unescape(meta_m.group(1)) if meta_m else "",
        }
    
    return result

pages_data = {}
services_data = {}

if pages_match:
    pages_data = parse_key_values(pages_match.group(1))
if services_match:
    services_data = parse_key_values(services_match.group(1))

print("=== PAGES ===")
for slug, data in sorted(pages_data.items()):
    content_preview = data["content"][:200].replace('\n', ' ')
    print(f"\n[{slug}] title={data['title']}")
    print(f"  content: {content_preview}...")

print(f"\n=== SERVICES ({len(services_data)}) ===")
for slug, data in sorted(services_data.items()):
    content_preview = data["content"][:150].replace('\n', ' ')
    print(f"\n[{slug}] title={data['title']}")
    print(f"  content: {content_preview}...")

# Save clean data
with open("data/clean_content.json", "w") as f:
    json.dump({"pages": pages_data, "services": services_data}, f, indent=2, ensure_ascii=False)

print(f"\n\nSaved {len(pages_data)} pages + {len(services_data)} services to data/clean_content.json")
