import React, { useMemo, useState, useEffect } from "react";
import Chart from "../../Components/Chart/Chart";
import FeaturedInfo from "../../Components/FeaturedInfo/FeaturedInfo";
import "./Home.css";
//import { userData } from "../../DummyData";
import WidgetSmall from "../../Components/WidgetSmall/WidgetSmall";
import WidgetLarge from "../../Components/WidgetLarge/WidgetLarge";
import { userRequest } from "../../requestMethod";

const Home = () => {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async() => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map(item => {
          setUserStats(prev => [
            ...prev, {
              name: MONTHS[item._id - 1], 
              "Active User" : item.total
            }
          ])
        })
      } catch (error) {
        console.log(error);
      }
    }
    getStats()
  }, [MONTHS])

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidget">
        <WidgetSmall />
        <WidgetLarge />
      </div>
    </div>
  );
};

export default Home;
