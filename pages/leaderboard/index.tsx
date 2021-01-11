import { useEffect, useState } from "react";
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

    return(
        <div>{leaderboardObj.map((person) => {
            <p>{person.username}</p>
        })}</div>
    )
}

export default leaderboard;