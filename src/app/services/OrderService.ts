import axios from "axios";
import { serverAPi } from "../../lib/config";
import exp from "constants";

class OrderService {
    private readonly path: string;

    constructor() {
        this.path = serverAPi;
    }
}

export default OrderService;