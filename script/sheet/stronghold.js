import { ForbiddenLandsActorSheet } from "./actor.js";

export class ForbiddenLandsStrongholdSheet extends ForbiddenLandsActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["forbidden-lands", "sheet", "actor"],
      template: "systems/forbidden-lands/model/stronghold.html",
      width: 600,
      height: 700,
      resizable: false,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "building",
        },
      ],
    });
  }

  getData() {
    const data = super.getData();
    this.computeItems(data);
    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".item-create").click((ev) => {
      this.onItemCreate(ev);
    });
  }

  computeItems(data) {
    for (let item of Object.values(data.items)) {
      item.isGear = item.type !== "building" && item.type !== "hireling";
      item.isBuilding = item.type === "building";
      item.isHireling = item.type === "hireling";
    }
  }

  onItemCreate(event) {
    event.preventDefault();
    let header = event.currentTarget;
    let data = duplicate(header.dataset);
    data["name"] = `New ${data.type.capitalize()}`;
    this.actor.createEmbeddedEntity("OwnedItem", data, { renderSheet: true });
  }
}
