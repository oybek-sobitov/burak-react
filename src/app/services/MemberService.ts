import axios from "axios";
import { serverAPi } from "../../lib/config";

class MemberService {
    private readonly path: string;

    constructor() {
        this.path = serverAPi;
    }

    public async getTopUsers(): Promise<[]> {
        try {
            const url = this.path + "/member/top-users";
            const result = await axios.get(url);
            console.log("getTopUsers:", result)

            return result.data
        } catch (err) {
            console.log("Error, getTopUsers:", err);
            throw err;
        }

    }
}

export default MemberService;