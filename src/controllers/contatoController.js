const Contato = require('../models/ContatoModel');
const mongoose = require('mongoose');

exports.index = (req, res) => {
    res.render("contato", { contato: {} });
};

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato/index'));
            return;
        }

        req.flash('success', 'contato registrado com sucesso');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.editIndex = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.render('404');

    const contato = await Contato.buscaPorId(id);

    if (!contato) return res.render('404');

    res.render("contato", { contato });
};

exports.edit = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.render('404');

        const contato = new Contato(req.body);
        await contato.edit(id);

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors.join(', '));
            // console.log('Erros contato:', res.locals.errors);
            req.session.save(() => {
                res.redirect('/contato/index');
            });
            return;
        }

        req.flash('success', 'contato editado com sucesso');
        req.session.save(() => res.redirect(`/`));
        return;
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.render('404');

    const contato = await Contato.delete(id);

    if (!contato) return res.render('404');

    req.flash('success', 'contato apagado com sucesso');
    req.session.save(() => res.redirect(`/`));
    return;
};
