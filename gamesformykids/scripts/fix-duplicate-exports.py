"""
Finds all TSX files in app/games that have duplicate `export default function` declarations
and truncates them after the first function's closing brace.
"""
import os
import re

def find_first_function_end(content: str) -> int:
    """
    Find the position just after the closing brace of the first `export default function`.
    Returns -1 if not found or no duplicate.
    """
    # Find first export default function
    match = re.search(r'export default function\s+\w+', content)
    if not match:
        return -1
    
    # Find second export default function
    second = re.search(r'export default function\s+\w+', content[match.end():])
    if not second:
        return -1  # No duplicate
    
    # We need to find the end of the first function body
    # Start from the opening brace of the first function
    start = match.start()
    
    # Skip past the parameter list to find the function body opening brace
    # The function body opens after the closing ) of the parameter list
    # We need to find the ) that closes the parameter list, then find the next {
    # Strategy: find the opening ( of the params, match parens, then find next {
    paren_pos = content.find('(', match.end())
    if paren_pos == -1:
        return -1
    
    # Match parens to find end of parameter list
    depth = 0
    j = paren_pos
    while j < len(content):
        if content[j] == '(':
            depth += 1
        elif content[j] == ')':
            depth -= 1
            if depth == 0:
                break
        j += 1
    
    # Now find the function body opening brace after the closing paren
    brace_pos = content.find('{', j)
    if brace_pos == -1:
        return -1
    
    # Match braces for the function body
    depth = 0
    i = brace_pos
    while i < len(content):
        if content[i] == '{':
            depth += 1
        elif content[i] == '}':
            depth -= 1
            if depth == 0:
                # This is the end of the first function
                # Return position after this closing brace + any trailing newline
                end = i + 1
                while end < len(content) and content[end] in ('\n', '\r'):
                    end += 1
                return end
        i += 1
    
    return -1


base_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'app', 'games')

fixed = []
for root, dirs, files in os.walk(base_dir):
    for fname in files:
        if fname.endswith('.tsx'):
            path = os.path.join(root, fname)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            end_pos = find_first_function_end(content)
            if end_pos != -1 and end_pos < len(content):
                # There's extra content after the first function - truncate it
                new_content = content[:end_pos]
                if not new_content.endswith('\n'):
                    new_content += '\n'
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                rel = os.path.relpath(path, os.path.dirname(base_dir))
                fixed.append(rel)

print(f"Fixed {len(fixed)} files:")
for f in fixed:
    print(f"  {f}")
