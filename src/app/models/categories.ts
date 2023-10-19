export class Categories {
    title: string = '';
    sections: Array<Section> = new Array();
}

export class Section {
    groups: Array<Group> = new Array();
}

export class Group {
    title: string = '';
    subSections: Array<string> = new Array();
}
