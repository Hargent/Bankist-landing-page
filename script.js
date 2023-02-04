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

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2023-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2023-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2023-02-02T23:00:00.000Z',
        '2020-07-12T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    movementsDates: [
        '2019-08-01T13:15:33.035Z',
        '2019-10-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:40:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'GBP',
    locale: 'en-GB',
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:05:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'NGN',
    locale: 'ca-ES',
};

const accounts = [account1, account2, account3, account4];
// creating locality with browser language
const locale = navigator.language;

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
// creating options for api
const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    day: 'numeric',
    //   month: 'long',
    month: 'long',
    year: 'numeric',
    //   weekday: 'long',
};
// for today's and yesterday transaction
const newOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
};
// Options for API formatting of currency
accounts.map(acc => {
    acc.currencyOptions = {
        style: 'currency',
        currency: acc.currency,
    };
});

// function to format currency values
const formatCurrency = (value, account) =>
    new Intl.NumberFormat(account.locale, account.currencyOptions).format(value);
//Creating date
const formatDate = (stamp, format) => {
    let date;
    if (stamp === undefined) {
        date = new Date();
    } else {
        date = new Date(stamp);
    }
    let comment;
    // use calcDaysPassed function;
    const calcDaysPassed = (date1, date2) => {
        return Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
    };

    const daysPassed = calcDaysPassed(new Date(), date);
    if (daysPassed === 0) {
        comment = `Today ${new Intl.DateTimeFormat(format, newOptions).format(
      date
    )}`;
    } else if (daysPassed === 1) {
        comment = `Yesterday ${new Intl.DateTimeFormat(format, newOptions).format(
      date
    )}`;
    } else if (daysPassed <= 7 && daysPassed > 1) {
        comment = `${daysPassed} days ago ${new Intl.DateTimeFormat(
      format,
      newOptions
    ).format()}`;
    } else {
        //   using api
        comment = new Intl.DateTimeFormat(format).format(date);
    }
    return {
        date: date,
        comment: comment,
    };
};

const displayMovement = function(acc, sort) {
    containerMovements.innerHTML = '';

    const movements = acc.movements;
    const dates = acc.movementsDates;
    const dateFormat = acc.locale;
    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
    movs.forEach((movement, index) => {
        const type = movement > 0 ? 'deposit' : 'withdrawal';
        const html = `
                    <div class = "movements__row">
                        <div class = "movements__type movements__type--${type}">
                        ${index + 1} ${type}</div>
                        <div class = "movements__date">${
                          formatDate(dates[index], dateFormat).comment
                        }</div>
                        <div class = "movements__value"> ${formatCurrency(
                          movement,
                          acc
                        )} </div>
                    </div>;
                    `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};
let balance = 0;
const displayBalance = acc => {
    const movements = acc.movements;
    balance = movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${formatCurrency(balance, acc)}`;
};
const displaySummary = acc => {
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${formatCurrency(incomes, acc)}`;
    const expenses = acc.movements
        .filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${formatCurrency(Math.abs(expenses), acc)}`;
    const interests = acc.movements
        .filter(move => move > 0)
        .map(mov => {
            return (mov * acc.interestRate) / 100;
        })
        .filter(interest => interest >= 1)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumInterest.textContent = `${formatCurrency(Math.abs(interests), acc)}`;
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
let currentAccount, timer;
const updateUI = accounts => {
    displayMovement(accounts);
    displayBalance(accounts);
    displaySummary(accounts);
};

// Logout function
const startLogoutTimer = () => {
    // set time
    let time = 300;

    //call time every seconds
    const tick = () => {
        console.log('calling');
        const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
        const seconds = `${time % 60}`.padStart(2, 0);

        // print remaining time
        labelTimer.textContent = `${min}:${seconds}`;

        //at time = 0, logout user
        if (time === 0) {
            clearInterval(timer);
            setTimeout(() => {
                labelWelcome.textContent = `Log in to get started.`;
                containerApp.style.opacity = 0;
                popup.style.display = 'none';
            }, 2000);
            replyPopup.textContent = `You time duration for inactivity is up...\nLogging off....`;
            popup.style.display = 'block';
        }
        console.log(time);

        time--;
    };

    tick();

    const timer = setInterval(() => tick(), 1000);
    return timer;
};

// Log IN Event
btnLogin.addEventListener('click', e => {
    e.preventDefault();

    currentAccount = accounts.find(
        account => account.userName === inputLoginUsername.value
    );

    if (currentAccount !== undefined) {
        if (currentAccount.pin === Number(inputLoginPin.value)) {
            setTimeout(() => {
                labelWelcome.textContent = `Welcome back, 
            ${currentAccount.owner.split(' ')[0]}`;
                containerApp.style.opacity = 1;
                //   logout timer
                if (timer) clearInterval(timer);
                timer = startLogoutTimer();
                //
                updateUI(currentAccount);
                inputLoginPin.value = inputLoginUsername.value = '';
                inputLoginUsername.blur();
                // change account label date
                labelDate.textContent = new Intl.DateTimeFormat(
                    currentAccount.locale,
                    options
                ).format(formatDate().date);
            }, 1000);

            replyPopup.textContent = `Successfully logged in...\nLoading your Account details....`;
            popup.style.display = 'block';
            setTimeout(() => {
                //   check for existing timer

                popup.style.display = 'none';
            }, 4000);
        } else {
            popup.style.display = 'block';
            replyPopup.textContent = `Invalid User Login pin`;
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
        popup.style.display = 'block';
        inputLoginPin.value = inputLoginUsername.value = '';
        inputLoginUsername.blur();
        replyPopup.textContent = `Invalid User Details`;
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
// Current balance date

//
btnTransfer.addEventListener('click', e => {
    e.preventDefault();

    recipientAccount = accounts.find(
        account => account.userName === inputTransferTo.value
    );
    if (recipientAccount !== undefined) {
        // let balance = currentAccount.movements.reduce((acc, mov) => acc + mov, 0)
        if (inputTransferAmount.value <= balance) {
            setTimeout(() => {
                currentAccount.movements.push(inputTransferAmount.value * -1);
                recipientAccount.movements.push(inputTransferAmount.value);

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
            }, 5000);
            replyPopup.textContent = `Processing Transaction \nPlease wait.....`;
            popup.style.display = 'block';
            setTimeout(() => {
                popup.style.display = 'none';
            }, 8000);
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
        }, 8000);
    }
    clearInterval(timer);
    timer = startLogoutTimer();
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
        setTimeout(() => {
            currentAccount.movements.push(loanAmount);
            updateUI(currentAccount);
            // successful deletion reply
            inputLoanAmount.value = '';
            replyPopup.textContent = `Loan Successful.\nYour account has been credited with ${Math.trunc(
        loanAmount * eurToUsd
      )}$`;
            popup.style.display = 'block';
            popup.addEventListener('click', e => {
                e.target.classList.value === 'popup' ?
                    (popup.style.display = 'none') :
                    '';
            });
        }, 4000);
        replyPopup.textContent = `Processing Transaction \nPlease wait.....`;
        popup.style.display = 'block';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 7000);
    }
    clearInterval(timer);
    timer = startLogoutTimer();
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
        setTimeout(() => {
            // delete account
            accounts.splice(index, 1);
            // successful deletion reply
            replyPopup.textContent = `Successfully Deleted your Account`;
            popup.style.display = 'block';
            // hide Ui
        }, 7000);
        replyPopup.textContent = `Processing Your Request \nPlease wait.....`;
        popup.style.display = 'block';
        setTimeout(() => {
            containerApp.style.opacity = 0;
            inputClosePin.value = inputCloseUsername.value = '';
            popup.style.display = 'none';
        }, 10000);
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
});
let sorted = false;
btnSort.addEventListener('click', e => {
    e.preventDefault();
    displayMovement(currentAccount, !sorted);
    sorted = !sorted;
});