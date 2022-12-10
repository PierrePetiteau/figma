type Person = {
  firstname: string;
  lastname: string;
  gender: "M" | "F";
  birthdate: string;
  deathdate?: string;
  weddingDate?: string;
  isChild?: boolean;
  avatar: string;
};

type Partner = Person & {
  childs?: Family[];
};

type Family = Person & {
  partners?: Partner[];
};
