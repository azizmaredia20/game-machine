import { rand, sleep } from "@utils/utils";

const gameLoader = async () => {
    await sleep();
    return { data: `Game loader - random value ${rand()}` };
}

export default gameLoader;