import { replaceMongoIdInObject } from "@/lib/convertData";
import { Assessment } from "@/model/assessment-model";
import { Report } from "@/model/report-model";

export async function getAReport(filter) {
  try {
    const report = await Report.findOne(filter)
      .populate({
        path: "quizAssessment",
        model: Assessment,
      })
      .lean();
    return report ? replaceMongoIdInObject(report) : {};
  } catch (error) {
    throw error;
  }
}
