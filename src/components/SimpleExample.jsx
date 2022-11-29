import React, { useRef, useState, useEffect } from "react";
import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows';
import Draggable from 'react-draggable';
const boxStyle = {
    border: "grey solid 4px", borderRadius: "100%", padding: "25px", height: "70px", width: "70px", fontSize: "20px"
};
let V = 100;
let graph = new Array(V);
for (let i = 0; i < V; i++)
    graph[i] = new Array(V);
for (let i = 0; i < V; i++) {
    for (let j = 0; j < V; j++)
        graph[i][j] = 0;
}
let parent = new Array(V);
let parentf = new Array(V);
const addedge = (props) => {
    console.log(props);
    return (
        <Xwrapper>
            <DraggableBox id={props.node1} />
            <DraggableBox id={props.node2} />
            <Xarrow start={props.node1} end={props.node2} />
        </Xwrapper>
    )
}
// A utility function to find the
// vertex with minimum distance
// value, from the set of vertices
// not yet included in shortest
// path tree
function minDistance(dist, sptSet) {

    // Initialize min value
    let min = Number.MAX_VALUE;
    let min_index = -1;

    for (let v = 0; v < V; v++) {
        if (sptSet[v] == false && dist[v] <= min) {
            min = dist[v];
            min_index = v;
        }
    }
    return min_index;
}

// A utility function to print
// the constructed distance array
function printSolution(dist) {
}

// Function that implements Dijkstra's
// single source shortest path algorithm
// for a graph represented using adjacency
// matrix representation
function dijkstra(start, end) {
    for (let i = 0; i < V; i++)
        parent[i] = -1;
    for (let i = 0; i < V; i++)
        parentf[i] = -1;
    parent[start] = start;
    let dist = new Array(V);
    let sptSet = new Array(V);

    // Initialize all distances as
    // INFINITE and stpSet[] as false
    for (let i = 0; i < V; i++) {
        dist[i] = Number.MAX_VALUE;
        sptSet[i] = false;
    }

    // Distance of source vertex
    // from itself is always 0
    dist[start] = 0;

    // Find shortest path for all vertices
    for (let count = 0; count < V - 1; count++) {

        // Pick the minimum distance vertex
        // from the set of vertices not yet
        // processed. u is always equal to
        // src in first iteration.
        let u = minDistance(dist, sptSet);

        // Mark the picked vertex as processed
        sptSet[u] = true;

        // Update dist value of the adjacent
        // vertices of the picked vertex.
        for (let v = 0; v < V; v++) {

            // Update dist[v] only if is not in
            // sptSet, there is an edge from u
            // to v, and total weight of path
            // from src to v through u is smaller
            // than current value of dist[v]
            if (!sptSet[v] && graph[u][v] != 0 &&
                dist[u] != Number.MAX_VALUE &&
                dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
                parent[v] = u;
            }
        }
    }

    // Print the constructed distance array
    printSolution(dist);

    dikstracolour(end);
}
function dikstracolour(src) {
    if (parent[src] === src)
        return
    document.getElementById(src).style.borderColor = "green";
    document.getElementById(src).style.borderWidth = "5px";
    parentf[src] = parent[src];
    dikstracolour(parent[src]);
}


// Driver code

/* Let us create the following graph
    2 3
    (0)--(1)--(2)
    | / \ |
    6| 8/ \5 |7
    | / \ |
    (3)-------(4)
    9	 */



const DraggableBox = ({ id }) => {
    const updateXarrow = useXarrow();
    return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
            <div id={id} style={boxStyle}>
                {id}
            </div>
        </Draggable>
    );
};

function SimpleExample() {
    let V1 = 100;

    // A utility function to find the vertex with
    // minimum key value, from the set of vertices
    // not yet included in MST
    function minKey(key, mstSet) {
        // Initialize min value
        let min = Number.MAX_VALUE, min_index;

        for (let v = 0; v < V1; v++)
            if (mstSet[v] == false && key[v] < min) { min = key[v]; min_index = v; }
        return min_index;
    }

    // A utility function to print the
    // constructed MST stored in parent[]
    function printMST(parent, graph) {

        for (let i = 1; i < V1; i++)
            console.log(parent[i] + "  - " + i + "  " + graph[i][parent[i]] + "<br>");
    }

    // Function to construct and print MST for
    // a graph represented using adjacency
    // matrix representation
    function primMST(start, graph) {
        // Array to store constructed MST
        let parent = [];

        // Key values used to pick minimum weight edge in cut
        let key = [];

        // To represent set of vertices included in MST
        let mstSet = [];

        // Initialize all keys as INFINITE
        for (let i = 0; i < V1; i++) { key[i] = Number.MAX_VALUE; mstSet[i] = false; }

        // Always include first 1st vertex in MST.
        // Make key 0 so that this vertex is picked as first vertex.
        key[start] = 0;
        parent[start] = -1; // First node is always root of MST

        // The MST will have V vertices
        for (let count = 0; count < V1 - 1; count++) {
            // Pick the minimum key vertex from the
            // set of vertices not yet included in MST
            let u = minKey(key, mstSet);
            // Add the picked vertex to the MST Set
            mstSet[u] = true;

            // Update key value and parent index of
            // the adjacent vertices of the picked vertex.
            // Consider only those vertices which are not
            // yet included in MST
            for (let v = 0; v < V1; v++)

                // graph[u][v] is non zero only for adjacent vertices of m
                // mstSet[v] is false for vertices not yet included in MST
                // Update the key only if graph[u][v] is smaller than key[v]
                if (graph[u][v] && mstSet[v] == false && graph[u][v] < key[v]) {

                    console.log(v, "->", u); parent[v] = u;
                    setPa(parent); key[v] = graph[u][v];
                }
        }

        // print the constructed MST
        printMST(parent, graph);
    }

    class Queue {
        constructor() {
            this.elements = {};
            this.head = 0;
            this.tail = 0;
        }
        enqueue(element) {
            this.elements[this.tail] = element;
            this.tail++;
        }
        dequeue() {
            const item = this.elements[this.head];
            delete this.elements[this.head];
            this.head++;
            return item;
        }
        peek() {
            return this.elements[this.head];
        }
        get length() {
            return this.tail - this.head;
        }
        get isEmpty() {
            return this.length === 0;
        }
    }

    class Stack {
        constructor() {
            this.items = [];
        }
        add(element) {
            return this.items.push(element);
        }
        remove() {
            if (this.items.length > 0) {
                return this.items.pop();
            }
        }
        peek() {
            return this.items[this.items.length - 1];
        }
        isEmpty() {
            return this.items.length == 0;
        }
        size() {
            return this.items.length;
        }
        clear() {
            this.items = [];
        }
    }
    let p = [];
    const [edge1, setedge1] = useState("");
    const [edge2, setedge2] = useState("");
    const [weight, setWeight] = useState(0);
    const [edges, setedges] = useState([]);
    const [node, setNode] = useState("");
    const [nodes, setNodes] = useState([]);
    const [start, setStart] = useState("");
    const [temp, setTemp] = useState("");
    const [parf, setParf] = useState([]);
    // Graph idea
    let adj;
    let n = 100;
    adj = new Array(n);
    for (let i = 0; i < n; i++)
        adj[i] = new Array(n);
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
            adj[i][j] = 0;
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const bfs = async () => {
        setDikstra(false);
        for (let i = 0; i < nodes.length; i++)
            bordeblack(nodes[i]);
        for (let i = 0; i < parentf.length; i++)
            parent[i] = -1;
        setPa(parent);
        for (let i = 0; i < nodes.length; i++)
            bordeblack(nodes[i]);
        for (let i = 0; i < parent.length; i++)
            parent[i] = -1;
        let vis = new Array(n);
        for (let i = 0; i < n; i++)
            vis[i] = 0;
        let q = new Queue;

        let temp = new Queue;
        q.enqueue(start);
        while (!q.isEmpty) {

            for (let i = 0; i < nodes.length; i++)
                bordeblack(nodes[i]);
            while (!q.isEmpty) {
                let p = q.peek();
                q.dequeue();
                vis[p] = 1;

                bordeblue(p);
                for (let i = 0; i < edges.length; i++) {
                    if (edges[i].edge1 == p && vis[edges[i].edge2] == 0) { temp.enqueue(edges[i].edge2); }
                }
            }
            let u = 0;
            while (!temp.isEmpty) {
                q.enqueue(temp.peek());
                temp.dequeue();
            }
            await sleep(500);
        }

        for (let i = 0; i < nodes.length; i++)
            bordeblack(nodes[i]);
        document.getElementById(start).style.borderColor = "red";

    }
    const bordeblack = (id) => {
        document.getElementById(id).style.borderColor = "black";
        document.getElementById(id).style.borderWidth = "4px";

    }
    const bordeblue = (id) => {
        document.getElementById(id).style.borderColor = "blue";
        document.getElementById(id).style.borderWidth = "4px";
    }

    const dfs = async () => {
        setDikstra(false);
        for (let i = 0; i < nodes.length; i++)
            bordeblack(nodes[i]);
        for (let i = 0; i < parentf.length; i++)
            parent[i] = -1;
        setPa(parent);
        let vis = new Array(n);
        for (let i = 0; i < n; i++)
            vis[i] = 0;

        let s = new Stack;
        s.add(start);
        while (!s.isEmpty()) {

            let p = s.peek();
            bordeblue(p);
            await sleep(1000);
            vis[p] = 1;
            let k = 0;
            for (let i = 0; i < edges.length; i++) {
                if (edges[i].edge1 == p && vis[edges[i].edge2] == 0) { k = 1; s.add(edges[i].edge2); break; }
            }

            if (k === 0) { s.remove(); bordeblack(p); }

        }
        document.getElementById(start).style.borderColor = "red";
    }




    // Driver code


    const addedge = () => {
        let x = false, y = false;
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i] === edge1)
                x = true;
            if (nodes[i] === edge2)
                y = true;
        }
        if (x == false || y == false)
            ;
        else if (edge1 === "")
            ;
        else if (edge2 === "")
            ;
        else if (edge1 == undefined)
            ;
        else if (edge2 == undefined)
            ;
        else {
            let show = true;
            setedges([...edges, { edge1, edge2, weight, show }]);
            graph[edge1][edge2] = parseInt(weight);
            console.log("After Adding", graph);

        }
        setedge1("");
        setedge2("");
        setWeight(0);
    }
    const manage1 = (e) => {
        setedge1(e.target.value);
    }
    const manage2 = (e) => {
        setedge2(e.target.value);
        let p = [];
    }
    const manage3 = (e) => {
        setTemp(e.target.value);
    }
    const manageweight = (e) => {
        setWeight(e.target.value);
    }
    const addnode = () => {
        let y = true;
        for (let i = 0; i < nodes.length; i++)
            if (nodes[i] === node)
                y = false;
        if (node.length > 0 && y)
            setNodes([...nodes, node]);
        if (start === "")
            setStart(node);
        setNode("");
    }
    const handle1 = (e) => {
        setNode(e.target.value);
    }
    const addstartnode = () => {
        let present = false;
        for (let i = 0; i < nodes.length; i++)
            if (nodes[i] === temp)
                present = true;
        if (present)
            setStart(temp);
        setTemp("");
        console.log(start);
    }
    const changeColor = () => {
        for (let i = 0; i < nodes.length; i++) {
            document.getElementById(nodes[i]).style.borderColor = "black";
        }
        if (start === "")
            ;
        else
            document.getElementById(start).style.borderColor = "red";
    }

    useEffect(() => {
        changeColor()
    }, [start])

    const adddstart = (e) => {
        setDstart(e.target.value);
    }
    const adddend = (e) => {
        setDend(e.target.value);
    }
    const dijkstra1 = () => {
        if (dikstraone) { setDend(""); setDstart(""); setDikstra(false); setDmes("Dijkstra"); console.log("Done", dijkstramessage); }
        for (let i = 0; i < nodes.length; i++)
            bordeblack(nodes[i]);
        for (let i = 0; i < parent.length; i++)
            parent[i] = -1;
        setDikstra(true);
        dijkstra(dstart, dend);
        setDmes("Dijkstra")
        // Print the solution

    }
    const spanningTree = () => {
        for (let i = 0; i < nodes.length; i++)
            bordeblack(nodes[i]);
        setDikstra(false);
        primMST(start, graph);
    }

    const [dstart, setDstart] = useState();
    const [dend, setDend] = useState();
    const [pa, setPa] = useState([]);
    const [dikstraone, setDikstra] = useState(false);
    const [dijkstramessage, setDmes] = useState("Dijkstra");
    return (
        <div>
            <div className="pb-0 flex sm:flex-row flex-col bg-blue-200  ">
                <div className="py-10 pl-10 items-center flex flex-col items-center flex-1 ">
                    <div className="text-center pb-3">
                        <div>ADD NODE</div>
                    </div>
                    <input value={node} className="h-7 sm:w-36 w-20" onChange={evt => handle1(evt)} ></input>
                    <div className="flex justify-center">
                        <div onClick={addnode} className="cursor-pointer hover:bg-blue-500 w-16 bg-blue-300 text-center m-4 rounded">
                            Submit
                        </div>
                    </div>
                </div>
                <div className="sm:p-10 p-4 flex flex-col flex-1 items-center">
                    <div>
                        ADD AN EDGE
                    </div>
                    <div className="flex gap-4 justify-center pt-3">
                        <input className="edge1 h-7 sm:w-36 w-20" value={edge1} onChange={evt => manage1(evt)}></input>
                        <div className="text-center pb-1">
                            <div>to</div>
                        </div>
                        <input className="edge2 h-7 w-20 sm:w-36" value={edge2} onChange={evt => manage2(evt)}></input>
                    </div>
                    <div className="mt-2">
                        <div className="text-center mb-2">WEIGHT</div>
                        <input className="edge2 h-7 w-36" value={weight} onChange={evt => manageweight(evt)}></input>
                    </div>
                    <div className="flex justify-center">
                        <div onClick={addedge} className="cursor-pointer hover:bg-blue-500 w-16 bg-blue-300 text-center m-4 rounded">
                            Submit
                        </div>
                    </div>
                </div>
                <div className="p-10 flex flex-col flex-1  items-center">
                    <div className="pb-3">
                        ADD START NODE
                    </div>
                    <input className="startnode w-36 h-7" value={temp} onChange={evt => manage3(evt)}></input>
                    <div className="flex justify-center">
                        <div onClick={addstartnode} className="cursor-pointer hover:bg-blue-500 w-16 bg-blue-300 text-center m-4 rounded">
                            Submit
                        </div>
                    </div>
                    <div className="text-center text-xl">
                        Start Node:{start}
                    </div>
                </div>
                <div className="pt-10 flex-1 flex flex-col items-center justify-center " >
                    <div onClick={dfs} className="cursor-pointer hover:bg-blue-500 w-16 bg-blue-300 text-center m-4 rounded">
                        DFS
                    </div>
                    <div onClick={bfs} className="cursor-pointer hover:bg-blue-500 w-16 bg-blue-300 text-center m-4 rounded">
                        BFS
                    </div>
                </div>
                <div className="flex flex-col justif-center items-center  sm:mr-10 pt-10">
                    <input className="w-36 h-7" value={dstart} onChange={evt => adddstart(evt)}></input>
                    <div className="text-center">To</div>
                    <input className="w-36 h-7" value={dend} onChange={evt => adddend(evt)}></input>
                    <div className="flex items-center justify-center">
                        <div onClick={dijkstra1} className=" flex cursor-pointer hover:bg-blue-500 bg-blue-300 text-center m-4 rounded-full p-2">
                            {dijkstramessage}
                        </div>

                    </div>
                    <div onClick={spanningTree} className=" flex cursor-pointer hover:bg-blue-500 bg-blue-300 text-center m-4 rounded-full p-2">
                        Show Minimum Spanning Tree
                    </div>

                </div>
            </div>
            <div>
                <div className="bg-[#C6CFFF] h-[500px]">
                    <Xwrapper>
                        {nodes.map((item) => (
                            <DraggableBox id={item} />
                        ))}
                        {edges.map((item) => (

                            < Xarrow id="arrow" start={
                                item.edge1
                            } end={item.edge2} color={dikstraone ? parentf[item.edge2] == item.edge1 ? "black" : "#4F81C7" : pa[item.edge2] == item.edge1 ? "red" : "#4F81C7"} labels=<div style={{ fontSize: "1.7em", fontFamily: "fantasy", fontStyle: "italic", color: "black", margin: "20px" }}>{item.weight}</div> />
                        ))}
                    </Xwrapper >

                </div>
            </div >

        </div >
    );
}

export default SimpleExample;