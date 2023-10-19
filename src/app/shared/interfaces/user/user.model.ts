export const ID_KEY_USER = 'idUtilisateur';

export interface IUser {
    [ID_KEY_USER]?: number;
    nom?: string;
    prenom?: string;
    login?: string;
    password?: string;
    displayedLabel?: string;
    hasBeenCreated?: boolean;
    enService?: boolean;
    email?: string;
    modelAccueil?: boolean;
    telephone?: string;
    displayIsActif?: number;
    displayIsAdmin?: number;
    tokenApi?: string;
    nightMode?: boolean;
    parrainage?: string;
    banniere?: string;
}

export class User implements IUser {
    public idUtilisateur?: number;
    public nom?: string;
    public prenom?: string;
    public login?: string;
    public password?: string;
    public displayedLabel?: string;
    public hasBeenCreated?: boolean;
    public enService?: boolean;
    public email?: string;
    public modelAccueil?: boolean;
    public telephone?: string;
    public displayIsActif?: number;
    public displayIsAdmin?: number;
    public tokenApi?: string;
    public nightMode?: boolean;
    public parrainage?: string;
    public banniere?: string;

    constructor(user?: Partial<IUser>) {
        if (user) Object.assign(this, user);
    }

    public get fullName(): string {
        return `${this.nom} ${this.prenom}`;
    }

    public get initials(): string {
        return `${this.prenom.charAt(0)}${this.nom.charAt(0)}`;
    }
}