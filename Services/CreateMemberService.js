import { prismaClient } from "../utils/prismaClient.js";
import bcrypt from "bcrypt";
import authDomain from "../model/authEnum.js";

export const createMember = async (newMember) => {
    try {
        const hashedPassword = await bcrypt.hash(newMember.password, 10);
        
        const role = handleRoleDomain(newMember.role)

        const createdMember = await prismaClient.manancialMembers.create({
          data: {
            name: newMember.name,
            birth_date: newMember.birth_date,
            full_name: newMember.full_name,
            email: newMember.email,
            password: hashedPassword,
            role: role,
            phone_number: newMember.phone_number,
            entry_membership_date: newMember.entry_membership_date,
            exit_membership_date: newMember.exit_membership_date,
          },
        });
    
        return createdMember;
        
      } catch (error) {
        throw error;
      }
};

export const requestMember = async (memberId) => {
  try {
    const member = await prismaClient.manancialMembers.findUnique({
      select: {
        member_id: true,
        full_name: true,
        email: true,
        birth_date: true,
        phone_number: true,
        entry_membership_date: true,
        exit_membership_date: true
      },
      where: {
          member_id: memberId
      }
    });

    return member;
      
    } catch (error) {
      throw error;
    }
};

export const requestAllMembers = async () => {
  try {
    const member = await prismaClient.manancialMembers.findMany({
      select: {
        member_id: true,
        full_name: true,
        email: true,
        birth_date: true,
        phone_number: true,
        entry_membership_date: true,
        exit_membership_date: true
      }
    });

    return member;
      
    } catch (error) {
      throw error;
    }
};

export const requestAllMembersWithQualidfications = async () => {
  try {
    const memberWithQualification = await prismaClient.manancialMembers.findMany({
      select: {
        member_id: true,
        full_name: true,
        email: true,
        birth_date: true,
        phone_number: true,
        entry_membership_date: true,
        exit_membership_date: true,
        qualification: {
          select: {
            qualification_id: true,
            occupation: true,
            role_church: true,
            marital_status: true,
            cpf: true,
            rg: true,
            address: true
          }
        }
      }
    });

    return memberWithQualification;
      
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


const handleRoleDomain = (roleString) => {
  switch (roleString) {
      case 'administrator':
          return authDomain.administrator;
      case 'midia':
          return authDomain.midia;
      case 'member':
        return authDomain.member;

      default:
          return authDomain.member;
  }
};