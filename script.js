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
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
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
  locale: 'en-UK',
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
  locale: 'en-NGN',
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

// calculate days passed
const calcDaysPassed = (currentDate, pastDay) => {
  console.log(currentDate, pastDay);
  const daysPassed = Math.round(
    Math.abs(currentDate - pastDay) / (1000 * 60 * 60 * 24)
  );
  if (currentDate - pastDay > 0) {
  }
  return daysPassed;
};

console.log(
  'days passed is : ' +
    calcDaysPassed(new Date(2023, 1, 25), new Date(2023, 2, 25))
);

//Creating date
const formatDate = stamp => {
  let date;
  if (stamp === undefined) {
    date = new Date();
  } else {
    date = new Date(stamp);
  }
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  const hour = `${date.getHours()}`.padStart(2, 0);
  const minute = `${date.getMinutes()}`.padStart(2, 0);
  const second = `${date.getSeconds()}`.padStart(2, 0);

  return {
    day: day,
    month: month,
    year: year,
    minute: minute,
    second: second,
    hours: hour,
  };
};
//return today,yesterday ,exact date
const returnDays = () => {
  let daysPassed;
  if (daysPassed === 0) {
    return 'Today';
  } else if (daysPassed === 1) {
    return 'Yesterday';
  } else {
    return daysPassed;
  }

  return report;
};

//
// date, daysPassed, exactDate;

//

console.log(
  'days passed is : ' +
    calcDaysPassed(new Date(2023, 1, 25), new Date(2023, 2, 25))
);

const displayMovement = function (acc, sort) {
  containerMovements.innerHTML = '';

  const movements = acc.movements;
  const dates = acc.movementsDates;

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach((movement, index) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
                    <div class = "movements__row">
                        <div class = "movements__type movements__type--${type}">
                        ${index + 1} ${type}</div>
                        <div class = "movements__date">${
                          formatDate(dates[index]).day
                        }/${formatDate(dates[index]).month}/${
      formatDate(dates[index]).year
    }</div>
                        <div class = "movements__value"> ${movement.toFixed(
                          2
                        )}€ </div>
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

// Always logger in
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 1;

// Current balance date

labelDate.textContent = `${formatDate().day}/${formatDate().month}/${
  formatDate().year
}, ${formatDate().hours}:${formatDate().minute}:${formatDate().second}`;

//
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
        e.target.classList.value === 'popup'
          ? (popup.style.display = 'none')
          : '';
      });
      setTimeout(() => {
        popup.style.display = 'none';
      }, 7000);
    } else {
      popup.style.display = 'block';
      replyPopup.textContent = `Insufficient funds`;
      inputTransferAmount.value = inputTransferTo.value = '';
      popup.addEventListener('click', e => {
        e.target.classList.value === 'popup'
          ? (popup.style.display = 'none')
          : '';
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
      e.target.classList.value === 'popup'
        ? (popup.style.display = 'none')
        : '';
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
    } else {
      replyPopup.textContent = `Invalid User Login pin`;
      popup.style.display = 'block';
      popup.addEventListener('click', e => {
        e.target.classList.value === 'popup'
          ? (popup.style.display = 'none')
          : '';
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
      e.target.classList.value === 'popup'
        ? (popup.style.display = 'none')
        : '';
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
    replyPopup.textContent = `Loan Successful.\nYour account has been credited with ${Math.trunc(
      loanAmount * eurToUsd
    )}$`;
    popup.style.display = 'block';
    popup.addEventListener('click', e => {
      e.target.classList.value === 'popup'
        ? (popup.style.display = 'none')
        : '';
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
      e.target.classList.value === 'popup'
        ? (popup.style.display = 'none')
        : '';
    });
    setTimeout(() => {
      popup.style.display = 'none';
    }, 300);
  }
  console.log(accounts);
});
let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovement(currentAccount, !sorted);
  sorted = !sorted;
});
