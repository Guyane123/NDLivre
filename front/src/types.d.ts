
type book = {
  title: string;
  authors: Array<string>;
  ISBN: Array<{ type: string; identifier: string }>;
  date: Date;
  publisher: string;
  categories: [string];
};

type extendedBook = book & {
  desc: string;
  pages: number;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
  };
};

export type user = {
    idLogin: number; //int | Paramètre de cookie pour savoir si l'utilisateur est connecté via login/password
    id: number; //int | Numéro de compte
    uid: number; //string | Il ne sert à rien lui aussi
    identifiant: string; //string | Username du compte
    typeCompte: string; //string | Voir Type de compte dans la référence
    codeOgec: string; //string | Code RNE de l'établissement scolaire du compte
    main: booleanean; //booleanean | Indique si ce compte est le compte principal de la famille(il peut en avoir plusieur comme avec un parent)
    lastConnexion: Date; //string | Date de dernière connexion à l'api via l'endpoint login (multiples connexions possibles)
    civilite: string;
    prenom: string;
    particule: string;
    nom: string;
    email: string;
    anneeScolaireCourante: string;
    nomEtablissement: string;
    logoEtablissement: string;
    couleurAgendaEtablissement: string;
    dicoEnLigneLeRobert: booleanean;
    socketToken: string; //string | Websocket, à priori il n'est pas prit en compte concernant l'authentification (si on le change on ne sera pas déconnecté)
    modules: [];
    parametresIndividuels: {
        lsuPoilDansLaMainBorne1: number; // int | Paramètre parcoursup
        lsuPoilDansLaMainBorne2: number; // int | Paramètre parcoursup
        lsuPoilDansLaMainBorne3: number; // int | Paramètre parcoursup
        modeCalculLSU: string; // ??? | Paramètre de recommandation parcoursup
        isQrcode: boolean; // ???
        accessibilitéVisuelle: booleanean; // booleanean | Pour les personnes malvoyantes, une police spéciale est mise en place
        typeSaisieNotesDefaut: string;
        nbJoursMaxRenduDevoirCDT: string;
        typeViewCDTDefaut: string;
    };
    profile: {
        sexe: string;
        infoEDT: string;
        nomEtablissement: string;
        idEtablissement: number;
        rneEtablissement: number;
        telPortable: number;
        idReelEtab: number;
        photo: string; //doc1.ecoledirecte.com/PhotoEleves/x/y.jpg,
        classe: {
            id: number;
            code: string;
            libelle: string;
            estNote: number;
        };
    };
};
