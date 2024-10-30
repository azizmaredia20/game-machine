import { rand, sleep } from "@utils/utils";

export const gameLoader = async () => {
    await sleep();
    return { data: `Game loader - random value ${rand()}` };
}