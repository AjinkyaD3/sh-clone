import re

html = open('app/projects/content.html', encoding='utf-8').read()

print("Admin Ajax URLs:")
print('\n'.join(set(re.findall(r'https?://[^\s\"\'<>]+ajax[^\s\"\'<>]+', html))))

print("\nWP API URLs:")
print('\n'.join(set(re.findall(r'https?://[^\s\"\'<>]+wp-json[^\s\"\'<>]+', html))))

print("\nOther WordPress Endpoint Strings:")
matches = re.findall(r'\"(?:https?://secure-house\.co\.uk)?/wp-admin/admin-ajax\.php[^\"]*\"', html)
print('\n'.join(set(matches)))

