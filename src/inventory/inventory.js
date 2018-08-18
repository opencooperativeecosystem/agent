import React from "react";
import style from "./style.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const Network = ({ data }) => {
  return (
    <Tabs selectedTabClassName={style.active}>
      <section className={style.agent}>
        <div className={style.inventory_list}>
          <TabList>
            {data.viewer.agent.ownedEconomicResources.map((item, i) => (
              <Tab key={i} className={style.list_item}>
                <span>{item.resourceClassifiedAs.name}</span>
              </Tab>
            ))}
          </TabList>
        </div>
        {data.viewer.agent.ownedEconomicResources.map((item, i) => (
          <TabPanel key={i}>
            <div className={style.inventory_canvas}>
              <div
                className={style.canvas_image}
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className={style.canvas_container}>
                <h1 className={style.canvas_title}>
                  {item.resourceClassifiedAs.name}
                </h1>
                <h5 className={style.canvas_description}>{item.note}</h5>
                <div className={style.canvas_options}>
                  <div className={style.options_item}>
                    <h5>Identifier</h5>
                    <h4>{item.trackingIdentifier}</h4>
                  </div>
                  <div className={style.options_item}>
                    <h5>Quantity</h5>
                    <h4>
                      {item.currentQuantity.numericValue +
                        " " +
                        item.currentQuantity.unit.name}
                    </h4>
                  </div>
                  <div className={style.options_item}>
                    <h5>Url</h5>
                    <h4>{item.url}</h4>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        ))}
      </section>
    </Tabs>
  );
};

export default Network;
