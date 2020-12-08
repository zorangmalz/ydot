import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

export const vm = window.innerWidth/100
export const vh = window.innerHeight/100

export default function Header({ splash }) {
    return (
        <header style={{
            width: 100 * vm,
            height: 80,
            backgroundColor: "#ffffff",
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: 16 * vm,
            paddingRight: 16 * vm,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }}>
                <div style={{
                    fontSize: 40,
                    fontWeight: "bold",
                    color: "#202426",
                }}>Y.</div>
                {splash ?
                    <></>
                    :
                    <>
                        <div style={{
                            fontSize: 21,
                            color: "#202426",
                            marginRight: 40,
                            marginLeft: 72,
                        }}>Home</div>
                        <div style={{
                            fontSize: 21,
                            color: "#202426",
                            marginRight: 40
                        }}>배당권 경매</div>
                        <div style={{
                            fontSize: 21,
                            color: "#202426"
                        }}>내 자산</div>
                    </>
                }
            </div>
            {splash ? <></> : <FaUserCircle color="#202426" size={48} />}
        </header>
    )
}