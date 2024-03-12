import { prismaClient } from "../utils/prismaClient.js";
import bcrypt from "bcrypt";

export const createMember = async (newMember) => {
    try {
        const hashedPassword = await bcrypt.hash(newMember.password, 10);
    
        const createdMember = await prismaClient.manancialMembers.create({
          data: {
            name: newMember.name,
            birth_date: newMember.birth_date,
            full_name: newMember.full_name,
            email: newMember.email,
            password: hashedPassword,
            phone_number: newMember.phone_number,
            entry_membership_date: newMember.entry_membership_date,
            exit_membership_date: newMember.exit_membership_date,
            member_id: newMember.member_id,
          },
        });
    
        return createdMember;
        
      } catch (error) {
        throw error;
      }
};

export const createMemberQualification = async (newClassifications) => {
    try {
      const createdQualification = await prismaClient.manancialMembersQualification.create({
        data: {
          occupation: newClassifications.occupation,
          role_church: newClassifications.role_church,
          marital_status: newClassifications.marital_status,
          cpf: newClassifications.cpf,
          rg: newClassifications.rg,
          address: newClassifications.address,
          member_id: newClassifications.member_id,
        },
      });
  
      return createdQualification;
    } catch (error) {
      throw error;
    }
};