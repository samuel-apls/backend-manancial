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

export const updateMember = async (id, member) => {
  try {
      const requestMember = await prismaClient.manancialMembers.findUnique({
        where: { member_id: id }
      });
      
      let currentDate = new Date();
      let entry_date = member.entry_membership_date || requestMember.entry_membership_date;
      let exit_date = member.exit_membership_date;
      
      if (member.exit_membership_date === null) {
        entry_date = currentDate;
        exit_date = null;
      }
      else if (member.exit_membership_date === undefined){
        exit_date = requestMember.exit_membership_date
      }

      // update just important fields that administrator have access
      const updateMember = await prismaClient.manancialMembers.update({
        where: { member_id: id },
        data: {
          full_name: member.full_name ? member.full_name : requestMember.full_name,
          email: member.email ? member.email : requestMember.email,
          phone_number: member.phone_number ? member.phone_number : requestMember.phone_number,
          role: member.role ? handleRoleDomain(member.role) : requestMember.role,
          entry_membership_date: entry_date,
          exit_membership_date: exit_date,
        },
      });
      
      // return just important data 
      return {
        name: updateMember.name,
        birth_date: updateMember.birth_date,
        full_name: updateMember.full_name,
        email: updateMember.email,
        role: updateMember.role,
        phone_number: updateMember.phone_number,
        entry_membership_date: updateMember.entry_membership_date,
        exit_membership_date: updateMember.exit_membership_date,
      };
      
    } catch (error) {
      if (error.name === "PrismaClientKnownRequestError"){
        return undefined;
      }
      else{
        throw error;
      }
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
        role: true,
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

export const requestAllValidMembers = async () => {
  try {
    const member = await prismaClient.manancialMembers.findMany({
      where: { exit_membership_date: null },
      select: {
        member_id: true,
        full_name: true,
        email: true,
        birth_date: true,
        phone_number: true,
        role: true,
        entry_membership_date: true,
        exit_membership_date: true
      }
    });

    return member;
      
    } catch (error) {
      throw error;
    }
};

export const requestAllInValidMembers = async () => {
  try {
    const member = await prismaClient.manancialMembers.findMany({
      where: { exit_membership_date: {not: null } },
      select: {
        member_id: true,
        full_name: true,
        email: true,
        birth_date: true,
        phone_number: true,
        role: true,
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
        role: true,
        entry_membership_date: true,
        exit_membership_date: true,
        qualification: {
          where: { exit_membership_qualification_date: {not: null} },
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

export const updateMemberQualification = async (id, classifications) => {
  try {
    const updatedQualification = await prismaClient.manancialMembersQualification.update({
      where: {member_id: id},
      data: {
        occupation: classifications.occupation,
        role_church: classifications.role_church,
        marital_status: classifications.marital_status,
        address: classifications.address,
        exit_membership_qualification_date: classifications.exit_membership_qualification_date 
      },
    });

    return updatedQualification;
  } catch (error) {
    if (error.name === "PrismaClientKnownRequestError"){
      return undefined;
    }
    else{
      throw error;
    }
  }
};


const handleRoleDomain = (roleString) => {
  let role;
  if (roleString) {
    role = roleString.toLowerCase();
  } 
  switch (role) {
      case 'administrador':
          return authDomain.administrator;
      case 'midia':
          return authDomain.midia;
      case 'member':
        return authDomain.member;

      default:
          return authDomain.member;
  }
};