
class UI {
    constructor() {
      this.budgetFeedback = document.querySelector(".budget-feedback");
      this.expenseFeedback = document.querySelector(".expense-feedback");
      this.budgetForm = document.getElementById("budget-form");
      this.budgetInput = document.getElementById("budget-input");
      this.budgetAmount = document.getElementById("budget-amount");
      this.expenseAmount = document.getElementById("expense-amount");
      this.balance = document.getElementById("balance");
      this.balanceAmount = document.getElementById("balance-amount");
      this.expenseForm = document.getElementById("expense-form");
      this.expenseInput = document.getElementById("expense-input");
      this.amountInput = document.getElementById("amount-input");
      this.expenseList = document.getElementById("expense-list");
      this.itemList = [];
      this.itemID = 0;
    }
  // submitBudgetForm() method
  submitBudgetForm(){
      const value = this.budgetInput.value;
      if(value === '' || value < 0){
          this.budgetFeedback.classList.add('showItem');
          this.budgetFeedback.innerHTML = `<p> value can't be empty or can't be Negative</p>`;
// After 4 second the budgetFeedback message will be dissappear from webPage
       setTimeout(()=>{
           this.budgetFeedback.classList.remove('showItem');
       },4000);           
      }
// if we enter Value in budgetInput then Value will be shown in balanceAmount
     else{
         this.budgetAmount.textContent = value;
         this.budgetInput.value = '' ;
         this.showBalance(); // showBalance() method Calling
     }      
   }
// showBalance() method
  showBalance(){
      const expense = this.totalExpense();
      const total = parseInt(this.budgetAmount.textContent) - expense;
      this.balanceAmount.textContent = total;
// If total < 0 ,then balance color will be red
// If total > 0 ,then balance color will be Green
// If total = 0 ,then balance color will be black
    if(total < 0){
       this.balance.classList.remove("showGreen","showBlack");
       this.balance.classList.add("showRed");
     }
    else if(total > 0){
        this.balance.classList.remove("showBlack","showRed");
        this.balance.classList.add("showGreen");
     }
    else if(total === 0){
        this.balance.classList.remove("showRed","showGreen");
        this.balance.classList.add("showBlack");
    }        
  }
  
// submitExpenseForm() method
   submitExpenseForm(){
     const expenseValue = this.expenseInput.value;
     const amountValue = this.amountInput.value;
     if(expenseValue === '' || amountValue === '' || amountValue < 0){
         this.expenseFeedback.classList.add('showItem');
         this.expenseFeedback.innerHTML = `<p>value can't be Empty or can't be Negative</p>`;
// After 3second this expenseFeedback msg would be dissappear from webPage
     setTimeout(()=>{
         this.expenseFeedback.classList.remove('showItem');
     },3000);         
    }
     else {
        let amount = parseInt(amountValue);
        this.expenseInput.value = '';
        this.amountInput.value = '';
        let expense = {
            id:this.itemID,
            title:expenseValue,
            amount:amount,
        }
        this.itemID++;
        this.itemList.push(expense);
        this.addExpense(expense); // addExpense() method is calling
        this.showBalance(); 
    }
 }
// add expense method
  addExpense(expense){
     const div = document.createElement('div');
     div.classList.add('expense');
     div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">

     <h6 class="expense-title mb-0 text-uppercase list-item">-${expense.title}</h6>
     <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

     <div class="expense-icons list-item">

      <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
       <i class="fas fa-edit"></i>
      </a>
      <a href="#" class="delete-icon" data-id="${expense.id}">
       <i class="fas fa-trash"></i>
      </a>
     </div>`;
     this.expenseList.appendChild(div);
  }
  
// totalExpense() method calling
  totalExpense(){
      let total = 0;
      if(this.itemList.length > 0){
         total = this.itemList.reduce((acc,curr) =>{
        //   console.log(`Total is ${acc} and the Current Value is ${curr.amount}`);
          acc += curr.amount;
          return acc;
         },0)
      }
// if itemList.length lessThan 0 then we'll do this      
      this.expenseAmount.textContent = total ; 
      return total;
  }
  
// edit Expense method
   editExpense(element){
     let id = parseInt(element.dataset.id);
     let parent = element.parentElement.parentElement.parentElement;
//remove from DOM
    this.expenseList.removeChild(parent);    
 //remove from the List
 let expense = this.itemList.filter(function(item){
     return item.id === id;
 });
 // show value
 this.expenseInput.value = expense[0].title;
 this.amountInput.value = expense[0].amount;
 //remove from the list
 let tempList = this.itemList.filter((item) =>{
     return item.id !== id;
 });
 
 this.itemList = tempList;
 this.showBalance();
   }
   deleteExpense(element){
     let id = parseInt(element.dataset.id);
     let parent = element.parentElement.parentElement.parentElement;
//remove from the DOM
   this.expenseList.removeChild(parent);
// remove from the List
   let tempList =  this.itemList.filter(function(item){
       return item.id !== id;
   });
   this.itemList = tempList;
   this.showBalance();  
   }  
}

function eventListener(){

 const budgetForm =  document.getElementById('budget-form');
 const expenseForm = document.getElementById('expense-form');
 const expenseList = document.getElementById("expense-list");

 // new instance of UI created
 const ui = new UI();


// Adding submit-Event to budget-form 
budgetForm.addEventListener('submit',function(event){
    event.preventDefault();
    ui.submitBudgetForm(); // method calling
})

// Adding submit-Event to Expense-form
expenseForm.addEventListener('submit',function(event){
    event.preventDefault();
    ui.submitExpenseForm();
})

// Adding click-Event to expense-List
expenseList.addEventListener('click',function(event){
 if(event.target.parentElement.classList.contains('edit-icon')){
     ui.editExpense(event.target.parentElement);
 }
 else if(event.target.parentElement.classList.contains('delete-icon')){
     ui.deleteExpense( event.target.parentElement);
 }
});
}
document.addEventListener('DOMContentLoaded',function(){
    eventListener();
});
