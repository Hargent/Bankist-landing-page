// 'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const replyPopup = document.querySelector('.popup-message');
const popup = document.querySelector('.popup');

const displayMovement = function(acc) {
    const movements = acc.movements;
    movements.forEach((movement, index) => {
        const type = movement > 0 ? 'deposit' : 'withdrawal';
        const html = `
                <div class = "movements__row">
                    <div class = "movements__type movements__type--${type}">
                    ${index + 1} ${type} </div>
                    <div class = "movements__value"> ${movement}€ </div>
                </div>;
                `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};
let balance = 0;
const displayBalance = acc => {
    const movements = acc.movements;
    balance = movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${balance} €`;
};
const displaySummary = acc => {
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes} €`;
    const expenses = acc.movements
        .filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(expenses)} €`;
    const interests = acc.movements
        .filter(move => move > 0)
        .map(mov => {
            return (mov * acc.interestRate) / 100;
        })
        .filter(interest => interest >= 1)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumInterest.textContent = `${Math.abs(interests)} €`;
};

const eurToUsd = 1.1;

accounts.map(acc => {
    const totalDepositInUsd = acc.movements
        .filter(mov => mov > 0)
        .map(mov => mov * eurToUsd)
        .reduce((acc, mov) => acc + mov, 0);
    return totalDepositInUsd;
});
accounts.map(acc => {
    const totalWithdrawalInUsd = acc.movements
        .filter(mov => mov < 0)
        .map(mov => mov * eurToUsd)
        .reduce((acc, mov) => acc + mov, 0);
    return totalWithdrawalInUsd;
});

const createUserNames = accounts => {
    accounts.forEach(account => {
        account.userName = account.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    });
};

createUserNames(accounts);

// EVENT HANDLERS
let currentAccount;
const updateUI = accounts => {
    displayMovement(accounts);
    displayBalance(accounts);
    displaySummary(accounts);
};
btnTransfer.addEventListener('click', e => {
    e.preventDefault();
    recipientAccount = accounts.find(
        account => account.userName === inputTransferTo.value
    );
    console.log(currentAccount, recipientAccount);
    if (recipientAccount !== undefined) {
        // let balance = currentAccount.movements.reduce((acc, mov) => acc + mov, 0)
        console.log(balance);
        if (inputTransferAmount.value <= balance) {
            currentAccount.movements.push(inputTransferAmount.value * -1);
            recipientAccount.movements.push(inputTransferAmount.value);
            console.log(currentAccount.movements, recipientAccount.movements);
            updateUI(currentAccount);
            replyPopup.textContent = `Transfer completed. 
            $${inputTransferAmount.value} was transferred to ${recipientAccount.owner}.\n
            Thanks for banking with us.`;
            popup.style.display = 'block';
            inputTransferAmount.value = inputTransferTo.value = '';
            popup.addEventListener('click', e => {
                e.target.classList.value === 'popup' ?
                    (popup.style.display = 'none') :
                    '';
            });
            setTimeout(() => {
                popup.style.display = 'none';
            }, 7000);
        } else {
            popup.style.display = 'block';
            replyPopup.textContent = `Insufficient funds`;
            inputTransferAmount.value = inputTransferTo.value = '';
            popup.addEventListener('click', e => {
                e.target.classList.value === 'popup' ?
                    (popup.style.display = 'none') :
                    '';
            });
            setTimeout(() => {
                popup.style.display = 'none';
            }, 7000);
        }
    } else {
        inputTransferAmount.value = inputTransferTo.value = '';
        popup.style.display = 'block';
        replyPopup.textContent = `Invalid Recipient details`;
        popup.addEventListener('click', e => {
            e.target.classList.value === 'popup' ?
                (popup.style.display = 'none') :
                '';
        });
        setTimeout(() => {
            popup.style.display = 'none';
        }, 7000);
    }
});
btnLogin.addEventListener('click', e => {
    e.preventDefault();
    currentAccount = accounts.find(
        account => account.userName === inputLoginUsername.value
    );
    console.log(currentAccount);
    if (currentAccount !== undefined) {
        if (currentAccount.pin === Number(inputLoginPin.value)) {
            labelWelcome.textContent = `Welcome back, 
            ${currentAccount.owner.split(' ')[0]}`;
            setTimeout(() => {
                containerApp.style.opacity = 1;
            }, 500);
            updateUI(currentAccount);
            inputLoginPin.value = inputLoginUsername.value = '';
            inputLoginUsername.blur();
            replyPopup.textContent = `Successfully Logged in`;
            popup.style.display = 'block';
            setTimeout(() => {
                popup.style.display = 'none';
                popup.style.zIndex = 100;
            }, 1000);
        } else {
            replyPopup.textContent = `Invalid User Login pin`;
            popup.style.display = 'block';
            popup.addEventListener('click', e => {
                e.target.classList.value === 'popup' ?
                    (popup.style.display = 'none') :
                    '';
            });
            setTimeout(() => {
                popup.style.display = 'none';
            }, 7000);
        }
    } else {
        inputLoginPin.value = inputLoginUsername.value = '';
        inputLoginUsername.blur();
        replyPopup.textContent = `Invalid User Details`;
        popup.style.display = 'block';
        popup.addEventListener('click', e => {
            e.target.classList.value === 'popup' ?
                (popup.style.display = 'none') :
                '';
        });
        setTimeout(() => {
            popup.style.display = 'none';
        }, 7000);
    }
});
// collecting load
btnLoan.addEventListener('click', e => {
    e.preventDefault();
    const loanAmount = Number(inputLoanAmount.value);

    const anyDeposits = currentAccount.movements.some(
        mov => mov >= 0.1 * loanAmount
    );
    if (loanAmount > 0 && anyDeposits) {
        //
        currentAccount.movements.push(loanAmount);
        updateUI(currentAccount);
        // successful deletion reply
        inputLoanAmount.value = '';
        replyPopup.textContent = `Loan Successful.\nYour account has been credited with ${
      loanAmount * eurToUsd
    }$`;
        popup.style.display = 'block';
        popup.addEventListener('click', e => {
            e.target.classList.value === 'popup' ?
                (popup.style.display = 'none') :
                '';
        });
        setTimeout(() => {
            popup.style.display = 'none';
        }, 5000);
    }
});

// closing Account
btnClose.addEventListener('click', e => {
    e.preventDefault();
    if (
        (inputCloseUsername.value = currentAccount.userName) &&
        (inputClosePin.value = currentAccount.pin)
    ) {
        const index = accounts.findIndex(
            acc => acc.userName === currentAccount.userName
        );
        // delete account
        accounts.splice(index, 1);
        // successful deletion reply
        replyPopup.textContent = `Successfully Deleted your Account`;
        popup.style.display = 'block';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 10000);
        // hide Ui
        containerApp.style.opacity = 0;
        inputClosePin.value = inputCloseUsername.value = '';
    } else {
        // failed deletion reply
        replyPopup.textContent = `Incorrect user details\nAccount not deleted.`;
        popup.style.display = 'block';
        inputClosePin.value = inputCloseUsername.value = '';

        popup.addEventListener('click', e => {
            e.target.classList.value === 'popup' ?
                (popup.style.display = 'none') :
                '';
        });
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    }
    console.log(accounts);
});

// console.log(accounts);
//

// const eurToUsd = 1.1;

// const movementsToUsd = account1.movements.map(movement => movement * eurToUsd);

// const movementsDescriptions = account1.movements.map((movement, index) => `Movement ${index + 1} : You ${movement > 0 ? deposited:withdrew} ${movement}`);

// console.log(movementsToUsd);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 7000, -650, -130, 70, 1300];

// FILTER METHOD
// const deposits = movements.filter(mov => mov > 0);
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(movements);
// console.log(deposits);
// console.log(withdrawals);
// REDUCE METHOD
// const balance = movements.reduce((acc, movement) => acc + movement, 0);
// console.log(balance);
// /////////////////////////////////////////////////
// for (const [i, mov] of movements.entries()) {
// //     mov > 0 ?
// //         console.log(`
// Movement $ { i + 1 }: You deposited $ { mov }
// `) :
// //         console.log(`
// Movement $ { i + 1 }: You Withdrew $ { Math.abs(mov) }
// `);
// // }
// // movements.forEach((mov, i, arr) => {
// //     mov > 0 ?
// //         console.log(`
// Movement $ { i + 1 }: You deposited $ { mov }
// `) :
// //         console.log(`
// // Movement $ { i + 1 }: You Withdrew $ { Math.abs(mov) }
// `);
// // });

// // const currencies = new Map([
// //     ['USD', 'United States dollar'],
// //     ['EUR', 'Euro'],
// //     ['GBP', 'Pound sterling'],
// // ]);

// // currencies.forEach((value, key, map) => {
// //     console.log(`
// $ { key }: $ { value }
// `);
// // });
// // const uniqueCurrencies = new Set([
// //     'USD',
// //     'EUR',
// //     'GBP',
// //     'USD',
// //     'NGN',
// //     'JPY',
// //     'EUR',
// // ]);
// // // console.log(uniqueCurrencies);
// // uniqueCurrencies.forEach((value, _, map) => {
// //     // console.log(`
// $ { value }: $ { value }
// `);
// // });
// // // coding challenge 1
// // const checkDogs = (julia, kate) => {
// //     let juliaNew = julia.slice(1, 3); // [...julia];
// //     // juliaNew.splice(0, 1);
// //     // juliaNew.splice(-2);

// //     console.log(julia, juliaNew, kate);
// //     newDogList = juliaNew.concat(kate);
// //     for (const dog of newDogList) {
// //         dog >= 3 ?
// //             console.log(
// //                 `
// Dog number $ {
//             newDogList.indexOf(dog) + 1
//           } is an Adult and is ${dog} years old.`
//             ) :
//             console.log(
//                 `Dog number ${
//             newDogList.indexOf(dog) + 1
//           } is still a puppy and is ${dog} years old.`
//             );
//     }
//     return newDogList;
// };
// console.log(checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]));
// console.log(checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]));