// Fetch and display all pages
async function loadPages() {
    try {
        const response = await fetch('/api/pages');
        const pages = await response.json();
        
        const container = document.getElementById('pages-container');
        container.innerHTML = '';
        
        for (const [key, page] of Object.entries(pages)) {
            const pageCard = document.createElement('div');
            pageCard.className = 'border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow';
            
            pageCard.innerHTML = `
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-bold text-blue-600">${key}</h3>
                    <div class="space-x-2">
                        <button onclick="editPage('${key}')" class="text-sm text-blue-500 hover:text-blue-700">Edit</button>
                        <button onclick="deletePage('${key}')" class="text-sm text-red-500 hover:text-red-700">Delete</button>
                    </div>
                </div>
                
                <div class="space-y-2 text-sm">
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <span class="font-semibold">Date:</span>
                            <span class="text-gray-600">${page.date.targetIso}</span>
                        </div>
                    </div>
                    
                    <div class="border-t pt-2 mt-2">
                        <h4 class="font-semibold text-gray-700 mb-1">Meta:</h4>
                        <div class="grid grid-cols-2 gap-2 text-xs">
                            <div><span class="font-medium">Page Title:</span> <span class="text-gray-600">${page.meta.pageTitle}</span></div>
                            <div><span class="font-medium">Description:</span> <span class="text-gray-600">${page.meta.description}</span></div>
                            <div><span class="font-medium">Keywords:</span> <span class="text-gray-600">${page.meta.keywords}</span></div>
                            <div><span class="font-medium">URL:</span> <span class="text-gray-600">${page.meta.url}</span></div>
                            <div><span class="font-medium">Slug:</span> <span class="text-gray-600">${page.meta.slug}</span></div>
                            <div><span class="font-medium">Image:</span> <span class="text-gray-600">${page.meta.image}</span></div>
                        </div>
                    </div>
                    
                    <div class="border-t pt-2 mt-2">
                        <h4 class="font-semibold text-gray-700 mb-1">Content:</h4>
                        <div class="grid grid-cols-2 gap-2 text-xs">
                            <div><span class="font-medium">Title:</span> <span class="text-gray-600">${page.content.title}</span></div>
                            <div><span class="font-medium">Connector:</span> <span class="text-gray-600">${page.content.connector}</span></div>
                            <div><span class="font-medium">What When:</span> <span class="text-gray-600">${page.content.whatWhen}</span></div>
                            <div><span class="font-medium">Time Left:</span> <span class="text-gray-600">${page.content.timeLeft}</span></div>
                            <div class="col-span-2">
                                <span class="font-medium">Info:</span>
                                <ul class="list-disc list-inside text-gray-600">
                                    ${page.content.info.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            container.appendChild(pageCard);
        }
    } catch (error) {
        console.error('Error loading pages:', error);
        document.getElementById('pages-container').innerHTML = 
            '<p class="text-red-500">Error loading pages. Please refresh the page.</p>';
    }
}

// Handle form submission
document.getElementById('page-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const infoArray = formData.get('info').split(',').map(item => item.trim()).filter(item => item);
    
    const pageData = {
        key: formData.get('key'),
        date: {
            targetIso: formData.get('targetIso')
        },
        meta: {
            pageTitle: formData.get('pageTitle'),
            description: formData.get('description'),
            keywords: formData.get('keywords'),
            url: formData.get('url'),
            slug: formData.get('slug'),
            image: formData.get('image')
        },
        content: {
            title: formData.get('title'),
            connector: formData.get('connector'),
            whatWhen: formData.get('whatWhen'),
            timeLeft: formData.get('timeLeft'),
            info: infoArray
        }
    };
    
    try {
        const response = await fetch('/api/pages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pageData)
        });
        
        if (response.ok) {
            alert('Page added successfully!');
            e.target.reset();
            loadPages();
        } else {
            const error = await response.json();
            alert(`Error: ${error.message || 'Failed to add page'}`);
        }
    } catch (error) {
        console.error('Error adding page:', error);
        alert('Error adding page. Please try again.');
    }
});

// Edit page (placeholder)
function editPage(key) {
    alert(`Edit functionality for ${key} - Coming soon!`);
}

// Delete page (placeholder)
function deletePage(key) {
    if (confirm(`Are you sure you want to delete ${key}?`)) {
        alert(`Delete functionality for ${key} - Coming soon!`);
    }
}

// Load pages on page load
loadPages();

