export interface Common {
    "menu-items":           MenuItems;
    "main-banner":          MainBanner;
    "withdrawal-partners":  WithdrawalPartners;
    "why-pryze":            WhyPryze;
    "our-top-games":        OurTopGames;
    faqs:                   Faqs;
    "tournament-winners":   TournamentWinners;
    footer:                 Footer;
    "privacy-policy":       string;
    "terms-and-conditions": string;
    copyright:              string;
    "follow-us":            string;
    "contact-us":           string;
}

export interface Faqs {
    title: string;
    items: FaqsItem[];
}

export interface FaqsItem {
    question: string;
    answer:   string;
}

export interface Footer {
    text: string;
}

export interface MainBanner {
    "sup-text":         string;
    "prize-text":       string;
    input:              Input;
    "get-app-link-btn": string;
    "download-app-btn": string;
}

export interface Input {
    placeholder: string;
}

export interface MenuItems {
    partners:    string;
    "why-pryze": string;
    games:       string;
    winners:     string;
    faq:         string;
}

export interface OurTopGames {
    title: string;
    items: OurTopGamesItem[];
}

export interface OurTopGamesItem {
    imgSrc: string;
    title:  string;
}

export interface TournamentWinners {
    title: string;
    items: TournamentWinnersItem[];
}

export interface TournamentWinnersItem {
    name:        string;
    amount:      string;
    description: string;
    imgSrc:      string;
}

export interface WhyPryze {
    title: string;
    items: WhyPryzeItem[];
}

export interface WhyPryzeItem {
    imgSrc:      string;
    title:       string;
    description: string;
}

export interface WithdrawalPartners {
    title: string;
}
