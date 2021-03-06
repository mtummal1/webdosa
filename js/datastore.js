import * as d3fetcher from 'd3-fetch';
import {dispatch} from "./index";

class Datastore {
    constructor(model) {
        this.model = model;
    }

    getEles() {
        if(!this.nodes || !this.edges) {
            this.nodes = [];
            this.edges = [];
            d3fetcher.json("/WebDOSA/data/activsg.json")
                .then(rows => {
                    rows.forEach(d => {
                        if (d.group === "nodes" && !d.classes.includes("substation")) this.nodes.push(d);
                        else this.edges.push(d);
                    });
                    return {nodes: this.nodes, edges: this.edges};
                }).then(function(graph) {dispatch.call('dataLoad', this, graph)});
        }
    }
}

export default Datastore;