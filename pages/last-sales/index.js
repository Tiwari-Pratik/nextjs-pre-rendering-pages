import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  const { data, error } = useSWR(
    "https://nextjs-course-c8214-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );
  // useEffect(() => {
  //   const loadUsers = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://nextjs-course-c8214-default-rtdb.firebaseio.com/sales.json"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Couldn't Load Data");
  //       }
  //       const data = await response.json();
  //       let dataArr = [];
  //       for (const [key, value] of Object.entries(data)) {
  //         dataArr.push({
  //           key: key,
  //           username: value.username,
  //           volume: value.volume,
  //         });
  //       }
  //       return dataArr;
  //     } catch (err) {
  //       throw err;
  //     }
  //   };
  //   setIsLoading(true);
  //   loadUsers()
  //     .then((data) => {
  //       setSales(data);
  //       console.log({ data });
  //       setIsLoading(false);
  //       setIsError(false);
  //     })
  //     .catch((err) => {
  //       setIsError(true);
  //     });
  // }, []);

  // if (isError) {
  //   return <p>Some Error Occured</p>;
  // }
  //
  // if (!isError && isLoading && !sales) {
  //   return <p>Loading...</p>;
  // }
  //
  // if (!isError && !isLoading && sales && sales.length !== 0) {
  //   return (
  //     <ul>
  //       {sales.map((sale) => {
  //         return (
  //           <li key={sale.key}>
  //             <h2>
  //               {sale.username} - {sale.volume}
  //             </h2>
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   );
  // }
  //
  useEffect(() => {
    if (data) {
      const dataArr = [];
      for (const [key, value] of Object.entries(data)) {
        dataArr.push({
          key: key,
          username: value.username,
          volume: value.volume,
        });
      }

      setSales(dataArr);
    }
  }, [data]);
  if (error) {
    return <p> Error Occured: {error}</p>;
  }
  if (!data && !sales) {
    return <p>Loading...</p>;

  }

  return (
    <ul>
      {sales.map((sale) => {
        return (
          <li key={sale.key}>
            <h2>
              {sale.username} - {sale.volume}
            </h2>
          </li>
        );
      })}
    </ul>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(
    "https://nextjs-course-c8214-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await res.json();

  const dataArr = [];
  for (const [key, value] of Object.entries(data)) {
    dataArr.push({
      key: key,
      username: value.username,
      volume: value.volume,
    });
  }
  return {
    props: {
      sales: dataArr,
    },
    revalidate: 10,
  };
};
export default LastSalesPage;
