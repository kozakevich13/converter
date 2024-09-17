import { useState, useEffect } from "react";


function useApi  (currency, apikey)  {
    const [data, setData] = useState(null);
 
    useEffect(() => {
      fetch(
        `https://api.apilayer.com/exchangerates_data/convert?to=UAH&from=${currency}&amount=1`, {
          headers: {
              'apikey': `${apikey}`,
            },
        }
      )
        .then((response) => response.json())
        .then((responsedata) => {
          setData(Math.round(responsedata.result * 100) / 100)
        });
    },);
  
    return {data} ;
  };

  export default useApi;