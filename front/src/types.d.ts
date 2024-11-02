export type article = {
  //ISBN: Array<{ type: 'ISBN_10' | 'ISBN_13'; identifier: string }>;
  id: string;
  date: Date;
  isVisible: boolean;
  desc: string;
  likes: Array<like>;
  comments: Array<comment>;
  user: user;
  bookId: string;
};

export type comment = {
  bookArticle: article;
  date: Date;
  content: String;
  user: user;
};

export type like = Omit<comment, 'content'>;

export type shelf = {
  id: number;
  title: string;
  updated: Date;
  created: Date;
  acces: 'PUBLIC' | 'PRIVATE';
  volumeCount: number;
  volumesLastUpdated: Date;
  selfLink: string;
};

export type book = {
  id: string;
  title: string;
  authors: Array<string>;
  ISBN: Array<{ type: 'ISBN_10' | 'ISBN_13'; identifier: string }>;
  date: Date;
  publisher: string;
  categories: Array<string>;
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

export type place = {
  name: string;
  coordinate: {
    lat: number;
    lng: number;
  };
};

type member = {
  civilite: string;
  prenom: string;
  particule: string;
  nom: string;
  sexe: 'F' | 'M';
  id: number;
  idRegime: number;
  type: string;
  matiere: string;
  photo: string;
  telephone: string;
  email: string;
  estBlackList: boolean;
  badge: string;
  messagerieActive: boolean;
  isPP: boolean;
  etablissements: any[];
  classe: Classe;
  responsable: Responsable;
  contacts: any[];
  fonction: Fonction;
};

type Classe = {
  id: number;
  code: string;
  libelle: string;
};

type Responsable = {
  id: number;
  versQui: string;
  typeResp: string;
};

type Fonction = {
  id: number;
  libelle: string;
};

type googleApiBookRes = {
  kind: 'books#volumes';
  totalItems: number;
  items: Array<googleApiBook>;
};

type googleApiBook = {
  kind: 'books#volume';
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: Array<{
      type: string;
      identifier: string;
    }>;
    readingModes: {
      text: boolean;
      image: boolean;
    };
    pageCount: number;
    printType: string;
    categories: string[];
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary?: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
      medium: string;
      small: string;
      large: string;
      thumbnail: string;
      extraLarge: string;
    };
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
  };
  layerInfo?: {
    layers: Array<{
      layerId: string;
      volumeAnnotationsVersion: string;
    }>;
  };
  saleInfo: {
    country: string;
    saleability: string;
    isEbook: boolean;
    listPrice?: {
      amount: number;
      currencyCode: string;
    };
    retailPrice?: {
      amount: number;
      currencyCode: string;
    };
    buyLink: string;
    offers?: Array<{
      finskyOfferType: number;
      listPrice: {
        amountInMicros: number;
        currencyCode: string;
      };
      retailPrice: {
        amountInMicros: number;
        currencyCode: string;
      };
      giftable: boolean;
    }>;
  };
  accessInfo: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: {
      isAvailable: boolean;
      acsTokenLink?: string;
    };
    pdf: {
      isAvailable: boolean;
      acsTokenLink?: string;
    };
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  };
};

export type history = {
  type: 'from' | 'to';
  user: user;
  bookArticle: article;
  date: Date;
  target: user;
};
export type user = {
  pseudonym: string;
  image: string | undefined;
  email: string | undefined;
  type: string;
  EDId: string | undefined;
  authType: string;
  books: Array<article>;
  history: article<history>;
  loans: Array<demand>;
  comments: Array<comment>;
};

export type demand = history & {
  validation: 'pending' | 'denied' | 'accepted';
};

export type EDUser = {
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
