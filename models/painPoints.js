import {makeObservable, action, computed, observable, makeAutoObservable} from "mobx"

import database from './storage';

const PAIN_MAP = {
    0: 'Без болю',
    1: 'Дуже м\'який',
    2: 'Некомфортний',
    3: 'Терпимий',
    4: 'Тривожний',
    5: 'Дуже тривожний',
    6: 'Інтенсивний',
    7: 'Дуже інтенсивний',
    8: 'Вкрай жахливий',
    9: 'Нестерпно болючий',
    10: 'Неймовірно невимовний'
}


export class PainPoint {
    constructor(intensity, coords, radius) {
        makeAutoObservable(this);
        this.intensity = parseInt(intensity);
        this.coords = coords;
        this.date = Date.now();
        this.radius = radius;
    }

    get description() {
        return PAIN_MAP[this.intensity];
    }

    get colorMap() {
        switch (this.intensity) {
            case 0:
                return 'cyan';
            case 1:
            case 2:
                return 'green';
            case 3:
            case 4:
                return 'lime';
            case 5:
            case 6:
                return 'gold';
            case 7:
            case 8:
                return 'orange';
            case 9:
                return 'volcano';
            case 10:
                return 'red'
        }
        return 'cyan';
    }

    get key() {
        return this.date;
    }

    get serialize() {
        return {...this};
    }

    static deserialize(content) {
        const result = new PainPoint("0", null);
        Object.assign(result, content)
        return result
    }
}

export default class PainPointsContainer {
    painPoints = []

    constructor(room) {
        makeAutoObservable(this);
        this.room = room;
        this.ref = database.ref('/pains/' + this.room)
        this.ref.on('value', v => {
            try {
                this.deserialize(v.val());
            } catch {
            }
        })
    }

    get serialize() {
        const result = {}

        for (const v of this.painPoints) {
            result[v.key] = v.serialize
        }

        return result;
    }

    deserialize(content) {
        this.painPoints.splice(0, this.painPoints.length);

        for (const v of Object.values(content)) {
            this.painPoints.push(PainPoint.deserialize(v));
        }
    }

    save() {
        const content = this.serialize
        this.ref.set(content);
    }

    add(picture) {
        this.painPoints.push(picture);
        this.save();
    }
}


