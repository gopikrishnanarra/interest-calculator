import React, {Component} from 'react';

export default class Calculator extends Component {
      constructor(props) {
          super(props);
          this.state = {
              amount: 0,
              interest: 0,
              paying: 0,
              nextPayment: 0,
              payments: [],
              interests: []
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
        let interests = [];
        let nextPayment = 0;
        const interest1 = ((this.state.amount * this.state.interest) / 100) / 12;
        for(let i = 0; i <= 100; i++ ) {
            if (nextPayment >= 0) {
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
        }
        this.setState({
            payments: payments,
            interests: interests
        });
    }


render() {
          function getMonthsBalanceData() {
              return this.state.payments.map(balance => {
                  return ( <tr className="td">
                      <td className="td">{this.state.payments.indexOf(balance)}</td>
                      <td className="td">{balance}</td>
                      <td className="td">{this.state.interests[this.state.payments.indexOf(balance)]}</td>
                  </tr>)
          })
          }
          function isButtonDisabled() {
              return !this.state.amount || !this.state.paying || !this.state.interest
          }
    return (
              <div>
                  <div>
                          <h5 className="h5">enter remaining amount</h5>
                        <input type="number" onChange={(e) => this.addAmount(e)}/>
                  </div>
                  <div>
                         <h5 className="h5">enter interest rate</h5>
                        <input type="number" onChange={(e) => this.addInterest(e)}/>
                  </div>
                  <div>
                     <h5 className="h5">amount you want to pay monthly</h5>
                     <input type="number" onChange={(e) => this.addPayment(e)}/>
                  </div>
                  <button disabled={isButtonDisabled.call(this)} onClick={() => this.getInterestPerDay()}>get payments</button>

                  {this.state.payments.length > 0 &&
                  <div>
                  <h2>Balance</h2>
                  <h3>You will finish your financing in {this.state.payments.length} months at rate
                      of {this.state.paying}/month</h3>
                  <h3>Total interest paying {this.state.interests.reduce((a,b) => parseFloat(a) + parseFloat(b), 0).toFixed(2)}</h3>
                  this table will show maximum of 100 payments
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
          )
}
}
