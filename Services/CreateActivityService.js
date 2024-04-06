import { prismaClient } from "../utils/prismaClient.js";

export const createActivity = async (newActivities) => {
    try {
        const createdActivities = await prismaClient.manancialActivities.createMany({
          data: newActivities.map(activity => ({
            name: activity.name,
            description: activity.description,
            local: activity.local,
            activity_date: activity.activity_date,
          })),
        });
    
        return createdActivities;
        
      } catch (error) {
        throw error;
      }
};