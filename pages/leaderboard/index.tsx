import { useEffect, useState } from "react";
import leaderboardcard from "../../components/leaderboard-card"
import axios, { AxiosError, AxiosResponse } from "axios";

const leaderboard = () => {

    const [leaderboardObj, setLeaderboardObj] = useState([]);
    const [showLeaderboard, setShowLeaderboard] = useState(true);

    useEffect(() => {
        console.log("Called useEffect() from leaderboard page")
        axios.get("/api/leaderboard")
        .then((data: AxiosResponse) => {
            console.log("DATA", data.data)
            setLeaderboardObj(data.data)
        }).catch((response: AxiosError) => {
            if(response.response!.status === 409) {
                console.log("GOT A 409")
            }
        });

        console.log("HERE")

        setShowLeaderboard(true)

        

    }, []);

    const runCards = () => {
        console.log(1)
        leaderboardObj.map((card) => {
            console.log(card)
        return(
            <h1>HI</h1>
        )
        })
    }
        return(
            <div>
                {leaderboardObj.map((card) => {
                    <p>HI</p>
                })}
            </div>
        )
    

}

export default leaderboard;