let craftsData = []; // This will hold the fetched crafts data

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/crafts')
        .then(response => response.json())
        .then(crafts => {
            craftsData = crafts; 
            const craftsContainer = document.getElementById('crafts');
            crafts.forEach((craft, index) => {
                const html = `
                    <div class="w3-quarter">
                        <img src="/crafts/${craft.image}" onclick="showModal(${index})" style="width:100%;cursor:pointer" alt="${craft.name}">
                    </div>
                `;
                craftsContainer.innerHTML += html;
            });
        });

    const modal = document.getElementById("craftModal");
    const span = document.getElementsByClassName("close")[0];

    window.showModal = (index) => {
        const craft = craftsData[index]; 
        document.getElementById('craftImage').src = `/crafts/${craft.image}`;
        document.getElementById('craftInfo').innerHTML = `
            <h1>${craft.name}</h1>
            <p>${craft.description}</p>
            <ul>${craft.supplies.map(supply => `<li>${supply}</li>`).join('')}</ul>
        `;
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

document.getElementById('addCraftBtn').addEventListener('click', function() {
    document.getElementById('addCraftModal').style.display = 'block';
    document.getElementById('addCraftForm').reset();
    document.getElementById('previewImage').style.display = 'none';
});

document.getElementById('selectImageBtn').addEventListener('click', function() {
    document.getElementById('craftImageInput').click();
});

document.getElementById('craftImageInput').addEventListener('change', function(event) {
    const [file] = event.target.files;
    if (file) {
        document.getElementById('previewImage').src = URL.createObjectURL(file);
        document.getElementById('previewImage').style.display = 'block';
    }
});

document.getElementById('addSupplyBtn').addEventListener('click', function() {
    const newSupplyInput = document.createElement('input');
    newSupplyInput.setAttribute('type', 'text');
    newSupplyInput.setAttribute('name', 'supplies[]');
    document.getElementById('suppliesContainer').appendChild(newSupplyInput);
});

document.getElementById('cancelBtn').addEventListener('click', function() {
    document.getElementById('addCraftModal').style.display = 'none';
});

document.getElementById('addCraftForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    // Implement form submission logic here...
});

window.onclick = function(event) {
    if (event.target == document.getElementById('addCraftModal')) {
        document.getElementById('addCraftModal').style.display = "none";
    }
}
