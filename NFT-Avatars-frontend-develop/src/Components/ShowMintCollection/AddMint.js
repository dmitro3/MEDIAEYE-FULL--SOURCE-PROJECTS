import React, { useState, useEffect } from "react";
import Properties from "../icons/Properties";
import Levels from "../icons/Levels";
import Stats from "../icons/Stats";
import Cross from "../icons/CrossIcon";

const AddMint = (props) => {
  const { changeAddons, addonsdata } = props;
  const [useAddonType, setuseAddonType] = useState("");
  const [properties, setProperties] = useState([]);
  const [levels, setLevels] = useState([]);
  const [stats, setStats] = useState([]);
  const [ChangeStats, setChangeStats] = useState(0);

  useEffect(() => {
    if (changeAddons) {
      changeAddons({ properties: properties, levels: levels, stats: stats });
    }
  }, [ChangeStats]);

  useEffect(() => {
    setProperties(addonsdata?.properties ? addonsdata.properties : []);
    setLevels(addonsdata?.levels ? addonsdata.levels : []);
    setStats(addonsdata?.stats ? addonsdata.stats : []);
  }, [addonsdata]);

  useEffect(() => {
    if (!useAddonType) {
      if (properties?.length > 0) {
        setuseAddonType("properties");
      } else if (levels?.length > 0) {
        setuseAddonType("levels");
      } else if (stats?.length > 0) {
        setuseAddonType("stats");
      }
    }
  }, [properties, levels, stats, useAddonType]);

  const addTaskField = async (type) => {
    console.log(type, "type");
    if (type === "properties") {
      let arr = properties.slice();
      arr.push({ trait_type: "", value: "" });
      setProperties(arr);
    } else if (type === "levels") {
      let arr = levels.slice();
      arr.push({ trait_type: "", value: "", max_value: "" });
      setLevels(arr);
    } else if (type === "stats") {
      let arr = stats.slice();
      arr.push({
        trait_type: "",
        value: "",
        max_value: "",
        display_type: "number",
      });
      setStats(arr);
    }
    showAddonsConent(type);
    setChangeStats(ChangeStats + 1);
  };

  const deleteProperties = (type, i) => {
    if (type === "properties") {
      let arr = properties.slice();
      arr.splice(i, 1);
      setProperties(arr);
    } else if (type === "levels") {
      let arr = levels.slice();
      arr.splice(i, 1);
      setLevels(arr);
    } else if (type === "stats") {
      let arr = stats.slice();
      arr.splice(i, 1);
      setStats(arr);
    }

    showAddonsConent(type);
    setChangeStats(ChangeStats + 1);
  };

  const handleAddonValueChange = (type, e, i) => {
    if (type === "properties") {
      let arr = properties.slice();
      arr[i].value = e.target.value;
      setProperties(arr);
    } else if (type === "levels") {
      let arr = levels.slice();
      arr[i].value = e.target.value;
      setLevels(arr);
    } else if (type === "stats") {
      let arr = stats.slice();
      arr[i].value = e.target.value;
      setStats(arr);
    }
    setChangeStats(ChangeStats + 1);
  };
  const handleAddonMaxValueChange = (type, e, i) => {
    if (type === "properties") {
      let arr = properties.slice();
      arr[i].max_value = e.target.value;
      setProperties(arr);
    } else if (type === "levels") {
      let arr = levels.slice();
      arr[i].max_value = e.target.value;
      setLevels(arr);
    } else if (type === "stats") {
      let arr = stats.slice();
      arr[i].max_value = e.target.value;
      setStats(arr);
    }
    setChangeStats(ChangeStats + 1);
  };

  const handleAddonTitleChange = (type, e, i) => {
    if (type === "properties") {
      let arr = properties.slice();
      arr[i].trait_type = e.target.value;
      setProperties(arr);
    } else if (type === "levels") {
      let arr = levels.slice();
      arr[i].trait_type = e.target.value;
      setLevels(arr);
    } else if (type === "stats") {
      let arr = stats.slice();
      arr[i].trait_type = e.target.value;
      setStats(arr);
    }
    setChangeStats(ChangeStats + 1);
  };

  const showAddonsConent = (type) => {
    if (type === "properties") {
      return properties.map((item, i) => (
        <div
          className="fav-mint-addition-head-inner-pprinput"
          key={i + "properties-list"}
        >
          <span>{i + 1}.</span>
          <input
            className="fav-mint-addition-head-inner-pprinput-input"
            key={i + " propertyname"}
            onChange={(e) => handleAddonTitleChange(type, e, i)}
            value={item.trait_type ? item.trait_type : ""}
          />
          <input
            className="fav-mint-addition-head-inner-pprinput-input"
            key={i + " propertiesvalue"}
            onChange={(e) => handleAddonValueChange(type, e, i)}
            value={item.value ? item.value : ""}
          />
          <button
            className="add cancle"
            onClick={() => deleteProperties(type, i)}
          >
            <Cross />
          </button>
        </div>
      ));
    } else if (type === "levels") {
      return levels.map((item, i) => (
        <div
          className="fav-mint-addition-head-inner-lvlinput"
          key={i + "levels-list"}
        >
          <span>{i + 1}.</span>
          <input
            className="fav-mint-addition-head-inner-lvlinput-input"
            key={i + " levelsname"}
            onChange={(e) => handleAddonTitleChange(type, e, i)}
            value={item.trait_type ? item.trait_type : ""}
          />
          <span>Value</span>
          <div className="fav-mint-addition-head-inner-lvlinput-inner">
            <input
              className="fav-mint-addition-head-inner-lvlinput-input text-right"
              key={i + " levelsvalue"}
              onChange={(e) => handleAddonValueChange(type, e, i)}
              value={item.value ? item.value : ""}
            />
            <span>of</span>
            <input
              className="fav-mint-addition-head-inner-lvlinput-input text-right"
              key={i + "levelsvalueOf"}
              onChange={(e) => handleAddonMaxValueChange(type, e, i)}
              value={item.max_value ? item.max_value : ""}
            />
          </div>
          <button
            className="add cancle"
            onClick={() => deleteProperties(type, i)}
          >
            <Cross />
          </button>
        </div>
      ));
    } else if (type === "stats") {
      return stats.map((item, i) => (
        <div
          className="fav-mint-addition-head-inner-lvlinput"
          key={i + "stats-list"}
        >
          <span>{i + 1}.</span>
          <input
            className="fav-mint-addition-head-inner-lvlinput-input sts"
            key={i + "statsname"}
            onChange={(e) => handleAddonTitleChange(type, e, i)}
            value={item.trait_type ? item.trait_type : ""}
          />
          <span>Value</span>
          <div className="fav-mint-addition-head-inner-lvlinput-inner">
            <input
              className="fav-mint-addition-head-inner-lvlinput-input sts"
              key={i + " statsvalue"}
              onChange={(e) => handleAddonValueChange(type, e, i)}
              value={item.value ? item.value : ""}
            />
            <span>Of</span>
            <input
              className="fav-mint-addition-head-inner-lvlinput-input sts"
              key={i + " statsvalueOf"}
              onChange={(e) => handleAddonMaxValueChange(type, e, i)}
              value={item.max_value ? item.max_value : ""}
            />
          </div>
          <button
            className="add cancle"
            onClick={() => deleteProperties(type, i)}
          >
            <Cross />
          </button>
        </div>
      ));
    }
  };

  return (
    <React.Fragment>
      <div className="fav-mint-addition">
        <div className="fav-mint-addition-head">
          <div className="fav-mint-addition-head-inner ppr">
            <Properties />
            Properties
          </div>
          <span>You can add up to 20 Properties</span>
          {showAddonsConent("properties")}
          {properties.length < 20 ? (
            <div className="fav-mint-addition-head-inner-pprinput">
              {/* <span>{i + 1}</span> */}
              <button
                className="add ppr"
                onClick={() => addTaskField("properties")}
              >
                <Cross />
              </button>
            </div>
          ) : null}
        </div>
        <div className="fav-mint-addition-head">
          <div className="fav-mint-addition-head-inner lvl">
            <Levels />
            Levels
          </div>
          <span>You can add up to 10 levels</span>
          {showAddonsConent("levels")}
          {levels.length < 10 ? (
            <div className="fav-mint-addition-head-inner-lvlinput">
              {/* <span>4.</span> */}
              <button
                className="add lvl"
                onClick={() => addTaskField("levels")}
              >
                <Cross />
              </button>
            </div>
          ) : null}
        </div>
        <div className="fav-mint-addition-head">
          <div className="fav-mint-addition-head-inner sts">
            <Stats />
            Stats
          </div>
          <span>You can add up to 5 stats</span>
          {showAddonsConent("stats")}
          {stats.length < 5 ? (
            <div className="fav-mint-addition-head-inner-lvlinput">
              {/* <span>3.</span> */}
              <button className="add sts" onClick={() => addTaskField("stats")}>
                <Cross />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddMint;
