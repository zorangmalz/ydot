import React, { useEffect, useState } from "react"
import axios from "axios"

export default function Data() {
    const [views, setViews] = useState(0)
    async function CreatorData() {
        let res = await axios.get('http://15.165.240.32:8000/v0/beta', { headers: { "Access-Control-Allow-Origin": "*" } });
        console.log(res.data[0]["logData"])
        let stringtype = JSON.stringify(res.data[0]["logData"])
        let objtype = JSON.parse(stringtype)
        let SUBS = new Array([])
        
        for (var k in objtype) {
            SUBS.push({x: k, y: objtype[k].subs})
        }
        let views = objtype["2017-07"]["views"]

        console.log(SUBS)
        setViews(views)
    }

    useEffect(() => {
        CreatorData()
    }, [])

    return (
        <div>
            {views}
        </div>
    )
}