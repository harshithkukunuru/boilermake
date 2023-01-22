// @ts-ignore lmaos
export const fetcher = (...args) => fetch(...args).then((res) => 
     res.json()
    );
