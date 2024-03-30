export type IDoctorFilterRequest = {
    searchTerm?: string | undefined;
    email?: string | undefined;
    contactNo?: string | undefined;
    gender?: string | undefined;
    specialties?: string | undefined;
};

export type IDoctorUpdate = {
    name: string;
    profilePhoto: string;
    contactNumber: string;
    address: string;
    registrationNumber: string;
    experience: number;
    gender: 'MALE' | 'FEMALE';
    apointmentFee: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
    specialties: ISpecialties[];
};

export type ISpecialties = {
    specialtiesId: string;
    isDeleted?: null;
};
