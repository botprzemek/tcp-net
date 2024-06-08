import { Bus } from "./bus";
import { Timer } from "./timer";

const bus: Bus = new Bus(1);

const updateTimer = (time: string[]): void => console.log(`\n\n\n\n\n\n\n\n\n\n${time.at(0)}:${time.at(1)}:${time.at(2)}`);
const updateQuarter = (quarter: number): void => console.log(`Quarter: ${quarter}`);

bus.on("update_timer", [ updateTimer ]);
bus.on("update_quarter", [ updateQuarter ]);

const timer: Timer = new Timer(bus);

timer.toggle();