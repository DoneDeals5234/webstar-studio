import os
import re
import glob

workspace = r"c:\Users\pv173\OneDrive\Documents\webstar-studio"

# Images mapping for each mockup
images = {
    'boutique': [
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80', # Hero 1
        'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80', # Hero 2
        'https://images.unsplash.com/photo-1572804013309-82a89141a5dc?auto=format&fit=crop&w=400&q=80',  # Cat 1
        'https://images.unsplash.com/photo-1596755094514-f87e32f85e98?auto=format&fit=crop&w=400&q=80',  # Cat 2
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=80',  # Cat 3
        'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=400&q=80',  # Prod 1
        'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=400&q=80',  # Prod 2
        'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=400&q=80',  # Prod 3
    ],
    'shoes': [
        'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80', # Hero
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80', # Prod 1
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80', # Prod 2
        'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=80', # Prod 3
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=400&q=80', # Prod 4
        'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=400&q=80', # Prod 5
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80', # Prod 6
    ],
    'perfume': [
        'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80', # Hero
        'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=400&q=80', # Prod 1
        'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=400&q=80', # Prod 2
        'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=400&q=80', # Prod 3
        'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80', # Prod 4
    ],
    'corporate': [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', # Hero
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80', # Service 1
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80', # Service 2
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80', # Service 3
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80', # Service 4
    ],
    'government': [
        'https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?auto=format&fit=crop&w=1200&q=80', # Hero
        'https://images.unsplash.com/photo-1580128660010-fdcb27678f28?auto=format&fit=crop&w=400&q=80', # Dep 1
        'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=400&q=80', # Dep 2
        'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=400&q=80', # Dep 3
    ]
}

js_script = """
<script>
document.addEventListener('DOMContentLoaded', function() {
    const mockup = window.location.pathname.split('/').reverse()[1];
    const images = %s;
    
    if (images[mockup]) {
        let imgs = images[mockup];
        let i = 0;
        
        // Try to replace hero background
        const heroes = document.querySelectorAll('.boutique-slide, .shoes-hero-wrapper, .perfume-hero, .corporate-hero, .gov-hero');
        heroes.forEach(h => {
            if(i < imgs.length) {
                h.style.background = `url('${imgs[i]}') center/cover no-repeat`;
                i++;
            }
        });

        // Replace graphic elements instead of background for some layouts
        const heroGraphics = document.querySelectorAll('.shoes-hero-graphic svg, .shoes-graphic-circle');
        heroGraphics.forEach(hg => hg.style.display = 'none');
        const heroGraphicContainers = document.querySelectorAll('.shoes-hero-graphic');
        heroGraphicContainers.forEach(hc => {
            if(i < imgs.length) {
                hc.style.background = `url('${imgs[i-1]}') center/cover no-repeat`; // use same hero image
                hc.style.borderRadius = '12px';
            }
        });

        // Replace product/category images
        const cards = document.querySelectorAll('.category-img, .product-img, .service-img, .dept-img');
        cards.forEach(card => {
            if(i < imgs.length) {
                card.style.background = `url('${imgs[i]}') center/cover no-repeat`;
                card.innerHTML = ''; // clear emoji or text
                i++;
            }
        });
    }
});
</script>
"""

import json
js_injected = js_script % json.dumps(images)

for folder in images.keys():
    idx_path = os.path.join(workspace, 'mockups', folder, 'index.html')
    if os.path.exists(idx_path):
        with open(idx_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'DOMContentLoaded' not in content:
            content = content.replace('</body>', js_injected + '\n</body>')
            with open(idx_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Injected images script into {folder}/index.html")

# Also add footer links to privacy and terms in main index.html
main_idx = os.path.join(workspace, 'index.html')
with open(main_idx, 'r', encoding='utf-8') as f:
    main_content = f.read()

footer_links = '''<ul>
            <li><a href="privacy.html">Privacy Policy</a></li>
            <li><a href="terms.html">Terms & Conditions</a></li>
          </ul>'''

if 'privacy.html' not in main_content:
    main_content = main_content.replace('<h4>Studio Services</h4>\n          <ul>', '<h4>Legal</h4>\n          ' + footer_links + '\n        </div>\n        <div class="footer-col">\n          <h4>Studio Services</h4>\n          <ul>')
    with open(main_idx, 'w', encoding='utf-8') as f:
        f.write(main_content)
    print("Added legal links to main index.html footer")
