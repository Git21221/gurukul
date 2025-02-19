//all shared models
import { Brand } from "./models/brand.model.js";
import { Founder } from "./models/founder.model.js";
import { Certificate } from "./models/certificate.model.js";
import { Course } from "./models/course.model.js";

//shared DB connection
import { connectionDB } from "./db/connectionDB.js";

export { Brand, Founder, Certificate, Course, connectionDB };
