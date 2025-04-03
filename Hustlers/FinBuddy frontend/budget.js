
        // Initial data
        const categorySuggestions = [
            'Groceries', 'Dining Out', 'Rent/Mortgage', 'Utilities', 
            'Phone/Internet', 'Transportation', 'Medical', 'Insurance',
            'Entertainment', 'Shopping', 'Personal Care', 'Education',
            'Savings', 'Investments', 'Debt Repayment', 'Gifts', 'Charity'
        ];

        const colorPalette = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
            '#FF9F40', '#8DD3C7', '#BEBADA', '#FB8072', '#80B1D3', 
            '#FDB462', '#B3DE69', '#FCCDE5', '#D9D9D9', '#BC80BD'
        ];

        let budgetCategories = [
            { id: 1, name: 'Housing', amount: 1200, spent: 950, color: '#FF6384' },
            { id: 2, name: 'Food', amount: 500, spent: 320, color: '#36A2EB' },
            { id: 3, name: 'Transportation', amount: 300, spent: 180, color: '#FFCE56' },
            { id: 4, name: 'Entertainment', amount: 200, spent: 150, color: '#4BC0C0' },
            { id: 5, name: 'Utilities', amount: 250, spent: 220, color: '#9966FF' }
        ];

        // DOM elements
        const categoriesContainer = document.getElementById('categories-container');
        const periodSelect = document.getElementById('period-select');
        const periodText = document.getElementById('period-text');
        const totalPeriodText = document.getElementById('total-period-text');
        const totalAmountEl = document.getElementById('total-amount');
        const newCategoryNameInput = document.getElementById('new-category-name');
        const newCategoryAmountInput = document.getElementById('new-category-amount');
        const addCategoryBtn = document.getElementById('add-category-btn');
        const saveBtn = document.getElementById('save-btn');
        const successAlert = document.getElementById('success-alert');
        const categorySuggestionsDatalist = document.getElementById('category-suggestions');

        // Initialize category suggestions
        categorySuggestions.forEach(suggestion => {
            const option = document.createElement('option');
            option.value = suggestion;
            categorySuggestionsDatalist.appendChild(option);
        });

        // Render all categories
        function renderCategories() {
            categoriesContainer.innerHTML = '';
            
            budgetCategories.forEach(category => {
                const categoryEl = document.createElement('div');
                categoryEl.className = 'category-item';
                categoryEl.innerHTML = `
                    <div class="category-name">
                        <span class="category-color" style="background-color: ${category.color}"></span>
                        <span>${category.name}</span>
                    </div>
                    <div class="amount-input">
                        <span>$</span>
                        <input 
                            type="number" 
                            min="0" 
                            value="${category.amount}"
                            data-id="${category.id}"
                            class="category-amount-input"
                        >
                    </div>
                    <div class="spent-display">
                        $${category.spent.toFixed(2)}
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${Math.min(100, (category.spent / category.amount) * 100)}%; background-color: ${category.color}"></div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <button class="btn btn-icon btn-delete" data-id="${category.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                    </div>
                `;
                
                categoriesContainer.appendChild(categoryEl);
            });
            
            // Add event listeners to delete buttons
            document.querySelectorAll('.btn-delete').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    removeCategory(id);
                });
            });
            
            // Add event listeners to amount inputs
            document.querySelectorAll('.category-amount-input').forEach(input => {
                input.addEventListener('change', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    const newAmount = parseFloat(this.value);
                    if (!isNaN(newAmount) && newAmount >= 0) {
                        updateCategoryAmount(id, newAmount);
                    }
                });
            });
            
            // Update total amount
            updateTotalAmount();
        }

        // Calculate and update total amount
        function updateTotalAmount() {
            const total = budgetCategories.reduce((sum, category) => sum + category.amount, 0);
            totalAmountEl.textContent = `$${total.toFixed(2)}`;

        }

        // Add new category
        function addCategory() {
            const name = newCategoryNameInput.value.trim();
            const amountStr = newCategoryAmountInput.value.trim();
            const amount = parseFloat(amountStr);
            
            if (!name || isNaN(amount) || amount < 0) {
                return;
            }
            
            const newId = budgetCategories.length > 0 
                ? Math.max(...budgetCategories.map(cat => cat.id)) + 1 
                : 1;
                
            const colorIndex = (newId - 1) % colorPalette.length;
            
            budgetCategories.push({
                id: newId,
                name: name,
                amount: amount,
                spent: 0,
                color: colorPalette[colorIndex]
            });
            
            newCategoryNameInput.value = '';
            newCategoryAmountInput.value = '';
            addCategoryBtn.disabled = true;
            
            renderCategories();
        }

        // Remove category
        function removeCategory(id) {
            budgetCategories = budgetCategories.filter(category => category.id !== id);
            renderCategories();
        }

        // Update category amount
        function updateCategoryAmount(id, newAmount) {
            budgetCategories = budgetCategories.map(category => 
                category.id === id 
                    ? { ...category, amount: newAmount } 
                    : category
            );
            
            updateTotalAmount();
        }

        // Save budget
        function saveBudget() {
            const period = periodSelect.value;
            const total = budgetCategories.reduce((sum, category) => sum + category.amount, 0);
            
            // In a real application, you would save this data to a database or localStorage
            console.log('Saving budget:', {
                period: period,
                categories: budgetCategories,
                total: total
            });
            
            // Show success message
            successAlert.style.display = 'block';
            
            // Hide after 3 seconds
            setTimeout(() => {
                successAlert.style.display = 'none';
            }, 3000);
        }

        // Event Listeners
        periodSelect.addEventListener('change', function() {
            const period = this.value;
            periodText.textContent = period;
            totalPeriodText.textContent = period;
        });

        newCategoryNameInput.addEventListener('input', validateNewCategory);
        newCategoryAmountInput.addEventListener('input', validateNewCategory);

        function validateNewCategory() {
            const name = newCategoryNameInput.value.trim();
            const amount = newCategoryAmountInput.value.trim();
            addCategoryBtn.disabled = !name || !amount;
        }

        addCategoryBtn.addEventListener('click', addCategory);
        saveBtn.addEventListener('click', saveBudget);

        // Initial render
        renderCategories();
    