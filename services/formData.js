import axios from 'axios';


const groupByPaymentMethodType = (group, nextItem) => {
  const { Category } = nextItem
  group[Category] = group[Category] ?? [];
  group[Category].push(nextItem);
  return group
}

const supportedPaymentMethods = async () => {
  let authKey = JSON.parse(localStorage.getItem("login"));
  let token = "Bearer " + authKey.access_token;

  try {

    return axios({
      url: "https://portal.payprocc.com/api/supportedpaymentmethods",
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      method: "GET",
    }).then(response => {
      let _paymentMethods = response.data.Data;
      _paymentMethods = _paymentMethods.map(
        x => {
          return {
          ...x,
          Category: x.Category == null ? 'Others' : x.Category
          }
        }
      )
      _paymentMethods = _paymentMethods.reduce(
        groupByPaymentMethodType, {}
      )
      return _paymentMethods
    })
  } catch (error) {
    console.error(error);
  }
};

const supportedProcessingCurrencies = async () => {
  let authKey = JSON.parse(localStorage.getItem("login"));
  let token = "Bearer " + authKey.access_token;

  try {
    const nationalCurrenciesRequest = axios({
      url: "https://portal.payprocc.com/api/supporteprocessingcurrencies",
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      method: "GET",
    });

    const cryptoCurrenciesRequest = axios({
      url: "https://portal.payprocc.com/api/supportedcryptocurrecies",
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      method: "GET",
    });

    return Promise.all([
      nationalCurrenciesRequest,
      cryptoCurrenciesRequest
    ])
    .then(([
      nationalCurrencies,
      cryptoCurrencies
    ]) => {
      const _currencies = {
        'National': nationalCurrencies.data.Data,
        'Crypto': cryptoCurrencies.data.Data.map(x =>  {
          // the trick is used to 
          // not collide the ids between
          // national and crypto currencies
          return {
            ...x, Id: x.Id * 10000
          }
      }),
      }
      return _currencies;
    })

  } catch (error) {
    console.error(error);
  }
};

const filllNullCountry = (country) => {
  return {
    ...country,
    Countinent:
      (country.Countinent == null
        ? 'Others'
        : country.Countinent)
  }
}

const groupByContinent = (group, country) => {
  const { Countinent } = country;
  group[Countinent] = group[Countinent] ?? [];
  group[Countinent].push(country);
  return group;
}

const countries = async () => {
  let authKey = JSON.parse(localStorage.getItem("login"));
  let token = "Bearer " + authKey.access_token;
  const _data = localStorage.getItem('countries')
  if (!_data) {
    try {
      return axios({
        url: "https://portal.payprocc.com/api/country",
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        method: "GET",
      }).then(response => {
        const countries = response.data.Data
        .map(filllNullCountry)
        .reduce(groupByContinent, {});
        localStorage.setItem(
          'countries',
          JSON.stringify(countries)
        )
        return countries;
      })
    } catch (error) {
      console.error(error);
    }
  } else {
    return new Promise(function(myResolve, myReject) {
        myResolve(JSON.parse(_data)); // when successful
        myReject({});  // when error
      });
  }
};

const supportedIndustries = () => {
  let authKey = JSON.parse(localStorage.getItem("login"));
  let token = "Bearer " + authKey.access_token;
  const _data = localStorage.getItem('industries')
  if (!_data) {
    try {
      return axios({
        url: "https://portal.payprocc.com/api/supportedindustries",
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        method: "GET",
      }).then(response => {
        const industries = { 'All industries' : response.data.Data }
        
        localStorage.setItem(
          'industries',
          JSON.stringify(industries)
        )
        return industries;
      })
    } catch (error) {
      console.error(error);
    }
  } else {
    return new Promise(function(myResolve, myReject) {
        myResolve(JSON.parse(_data)); // when successful
        myReject({});  // when error
      });
  }
}

export default {
  countries,
  supportedPaymentMethods,
  supportedProcessingCurrencies,
  supportedIndustries
}