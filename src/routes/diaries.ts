import { Response } from 'express';
import express from 'express';
import diaryService from '../services/diaryService';

import { NonSensitiveDiaryEntry } from '../types.js';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
	res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
	const diary = diaryService.findById(Number(req.params.id));

	if (diary) {
		res.send(diary);
	} else {
		res.sendStatus(404)
	}
});

router.post('/', (req, res) => {
	const { date, weather, visibility, comment } = req.body;
	const addedEntry = diaryService.addDiary({
		date,
		weather,
		visibility,
		comment,
	});
	res.json(addedEntry)
});

export default router;
