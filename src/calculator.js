import React, {Component} from 'react';

function getInterest() {
    return <div>
        <h5 className="h5">Enter interest rate</h5>
        <input type="number" onChange={(e) => this.addInterest(e)}/>
    </div>;
}
function getAmount() {
    return <div>
        <h5 className="h5">Enter remaining amount</h5>
        <input type="number" onChange={(e) => this.addAmount(e)}/>
    </div>;
}
function getCloseButton() {
    return <div>
        <button onClick={() => this.closeComponent()}>close</button>
    </div>
}

function getMonthlyPayment() {
    return <div>
        <h5 className="h5">amount you want to pay monthly</h5>
        <input type="number" onChange={(e) => this.addPayment(e)}/>
    </div>;
}
function getMonthlyPaymentsToCompare() {
    return <div>
        <input type="number" onChange={(e) => this.getPaymentToCompare(e)}/>
    </div>;
}

export default class Calculator extends Component {
      constructor(props) {
          super(props);
          this.state = {
              amount: 0,
              interest: 0,
              paying: 0,
              compare: false,
              calculate: false,
              nextPayment: 0,
              payments: [],
              paymentToCompare: [],
              interests: [],
              isPaymentsValid: true,
              interestsToCompare: []
          }
      }
    addAmount(e) {
        this.setState({
            amount: e.target.value
        })
    }
    addInterest(e) {
        this.setState({
            interest: e.target.value
        })
    }
    addPayment(e) {
        this.setState({
            paying: e.target.value,
            isPaymentsValid: true,
            payments: []
        })
    }
    getPaymentToCompare(e) {
        this.setState({
            paymentToCompare: [e.target.value]
        });
    }
    compare() {
        this.setState({
            compare: true
        })
    }
    calculateInterests() {
        this.setState({
            calculate: true
        })
    }
    closeComponent() {
        this.setState({
            amount: 0,
            interest: 0,
            paying: 0,
            compare: false,
            calculate: false,
            nextPayment: 0,
            payments: [],
            paymentToCompare: [],
            interests: [],
            isPaymentsValid: true,
            interestsToCompare: []
        })
    }
    calculatePayments() {
        let payments = [];
        let interests = [];
        let nextPayment = 0;
        const interest1 = ((this.state.amount * this.state.interest) / 100) / 12;
        for(let i = 0; nextPayment >= 0; i++ ) {
            if(payments.length > 0 && nextPayment > payments[i-1]) {
                this.setState({
                    isPaymentsValid: false
                });
                return;
            }
                if (i === 0) {
                    payments[i] = parseInt(this.state.amount);
                    interests[i] = interest1.toFixed(3);
                    nextPayment = ((parseInt(this.state.amount) + interest1) - parseInt(this.state.paying))
                }
                if (i !== 0) {
                    payments[i] = parseInt(nextPayment);
                    const interest = ((payments[i] * this.state.interest) / 100) / 12;
                    interests[i] = interest.toFixed(3);
                    nextPayment = interest + payments[i] - parseInt(this.state.paying)
                }
        }
        this.setState({
            payments: payments,
            interests: interests,
        });
    }

    getInterestsToCompare() {
        let interestsToCompare = [];
              let interests = [];
              let nextPayment = 0;
              for(let i = 0; nextPayment >= 0; i++ ) {
                  if (i === 0) {
                      const interest = ((this.state.amount * this.state.interest) / 100) / 12;
                      interests[i] = interest.toFixed(3);
                      nextPayment = ((parseInt(this.state.amount) + interest) - parseInt(this.state.paymentToCompare))
                  }
                  if (i !== 0) {
                      const interest = ((parseInt(nextPayment) * this.state.interest) / 100) / 12;
                      interests[i] = interest.toFixed(3);
                      nextPayment = interest + parseInt(nextPayment) - parseInt(this.state.paymentToCompare)
                  }
              }
            interestsToCompare[interests.length] = [this.state.paymentToCompare, interests.reduce((a, b) => parseFloat(a) + parseFloat(b), 0).toFixed(2)];
        this.setState({
            interestsToCompare: this.state.interestsToCompare.concat(interestsToCompare)
        });
    }


render() {
          console.log(this.state.isPaymentsValid);
          function getMonthsBalanceData() {
              return this.state.payments.map(balance => {
                  return ( <tr className="td">
                      <td className="td">{this.state.payments.indexOf(balance)}</td>
                      <td className="td">{balance}</td>
                      <td className="td">{this.state.interests[this.state.payments.indexOf(balance)]}</td>
                  </tr>)
          })
          }
          function getComparePaymentsData() {
              return this.state.interestsToCompare.map(interest => {
                  return ( <tr className="td">
                      <td className="td">{interest[0]}</td>
                      <td className="td">{this.state.interestsToCompare.indexOf(interest)}</td>
                      <td className="td">{interest[1]}</td>
                  </tr>)
          })
          }
          function isButtonDisabled() {
              return !this.state.amount  || !this.state.interest || (!this.state.paying && !this.state.paymentToCompare)
          }

    return (
              <div>
                  {!this.state.calculate && !this.state.compare &&
                      <div>
                          <button onClick={() => this.calculateInterests()}>calculate payments</button>
                          <button onClick={() => this.compare()}>compare interests</button>
                      </div>
                  }
                  {this.state.calculate &&
                  <div>
                      {getAmount.call(this)}
                      {getInterest.call(this)}
                      {getMonthlyPayment.call(this)}
                      <button disabled={isButtonDisabled.call(this)} onClick={() => this.calculatePayments()}>get
                          payments
                      </button>
                      {getCloseButton.call(this)}

                      {this.state.payments.length > 0 &&
                      <div>
                          <h2>Balance</h2>
                          {this.state.isPaymentsValid &&
                              <div>
                                  <h3>You will finish your financing in {this.state.payments.length} months at rate
                                      of {this.state.paying}/month</h3>
                                  <h3>Total interest
                                      paying {this.state.interests.reduce((a, b) => parseFloat(a) + parseFloat(b), 0).toFixed(2)}</h3>
                                  <table className="table">
                                      <tbody>
                                      <tr className="td">
                                          <th className="th">payment months from today</th>
                                          <th className="th">balance remained</th>
                                          <th className="th">interest added</th>
                                      </tr>
                                      {getMonthsBalanceData.call(this)}
                                      </tbody>
                                  </table>
                              </div>
                          }
                      </div>
                      }
                      {!this.state.isPaymentsValid &&
                      <div>
                          <h2>You will never finish your financing at rate
                              of {this.state.paying}/month</h2>
                      </div>
                      }
                  </div>
                  }
                  {this.state.compare &&
                  <div>
                      {getAmount.call(this)}
                      {getInterest.call(this)}
                      <h5 className="h5">Add payment to compare</h5>
                      {getMonthlyPaymentsToCompare.call(this)}
                      <button disabled={isButtonDisabled.call(this)} onClick={() => this.getInterestsToCompare()}>
                          compare
                      </button>
                      {getCloseButton.call(this)}
                      <table className="table">
                          <tbody>
                          <tr className="td">
                              <th className="th">monthly payment</th>
                              <th className="th">total months</th>
                              <th className="th">total interest paid</th>
                          </tr>
                          {getComparePaymentsData.call(this)}
                          </tbody>
                      </table>
                  </div>
                  }

              </div>
          )
}
}
