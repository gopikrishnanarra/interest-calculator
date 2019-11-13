import React, {Component} from 'react';

export default class Calculator extends Component {
      constructor(props) {
          super(props);
          this.state = {
              amount: 0,
              paying: 0,
              nextPayment: 0,
              interest: 0,
              payments: []
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
            paying: e.target.value
        })
    }
    getInterestPerDay() {
        let payments = [];
        let nextPayment = 0;
        for(let i = 0; i <= 100; i++ ) {
            if (nextPayment >= 0) {
                const interest = ((this.state.amount * this.state.interest) / 100) / 12;
                if (i === 0) {
                    payments[i] = parseInt(this.state.amount);
                    nextPayment = ((parseInt(this.state.amount) + interest) - parseInt(this.state.paying))
                }
                if (i !== 0) {
                    payments[i] = parseInt(nextPayment);
                    nextPayment = (((payments[i] * this.state.interest) / 100) / 12) + payments[i] - parseInt(this.state.paying)
                }
            }
        }
        this.setState({
            payments: payments
        });
    }


render() {
          function getMonthsBalanceData() {
              return this.state.payments.map(balance => {
                  return ( <tr className="td">
                      <td className="td">{this.state.payments.indexOf(balance)}</td>
                      <td className="td">{balance}</td>
                  </tr>)
          })
          }
    return (
              <div>
                  {/*<section className="centered">*/}
                  {/*<div className="centered">*/}
                  <input type="number" placeholder="enter remaining amount" onChange={(e) => this.addAmount(e)}/>
                  <input type="number" placeholder="enter interest rate" onChange={(e) => this.addInterest(e)}/>
                  <input type="number" placeholder="amount you want to pay monthly" onChange={(e) => this.addPayment(e)}/>
                  <button onClick={() => this.getInterestPerDay()}>get payments</button>
                  {/*</div>*/}
                  {/*</section>*/}
                  {this.state.payments.length > 0 &&
                  <div>
                  <h2>Balance</h2>
                  <h3>You will finish the financing in {this.state.payments.length} months at rate
                      of {this.state.paying}/month</h3>
                  this table will show maximum of 100 payments
                  <table className="table">
                      <tbody>
                      <tr className="td">
                          <th className="th">payment months from today</th>
                          <th className="th">balance remained</th>
                      </tr>
                      {getMonthsBalanceData.call(this)}
                      </tbody>
                  </table>
                  </div>
                  }
              </div>
          )
}
}
