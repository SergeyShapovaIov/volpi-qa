import {FC, FormEvent, useEffect, useState} from 'react';
import {MainLayout} from "../components/layouts/MainLayout";
import {useNavigate, useParams} from "react-router-dom";
import {QuestionsList} from "../components/questions/QuestionsList";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchQuestionsByCategory} from "../store/actions/questionAction";
import {QuestionsForm} from "../components/questions/QuestionsForm";
import {Sidebar} from "../components/Sidebar";
import {clearCurrentCategory} from "../store/reducers/categorySlice";
import {ValidatedInput} from "../components/UI/ValidatedInput/ValidatedInput";
import {createValidateInputValueFunc} from "../utils/createValidateInputValue/createValidateInputValueFunc";
import {CheckIcon, NoSymbolIcon} from "@heroicons/react/20/solid"
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {fetchCategories, updateCategory} from "../store/actions/categoryAction";
import {clearQuestions} from "../store/reducers/questionSlice";
import {PrimaryButton} from "../components/UI/PrimaryButton/PrimaryButton";
import {SecondaryButton} from "../components/UI/SecondaryButton";

const CategoryName: FC = () => {
    const navigate = useNavigate()
    const {name} = useParams()
    const {currentCategory} = useAppSelector(state => state.category)
    const [editCategoryNameMode, setEditCategoryNameMode] = useState(false)
    const [isValidCategoryName, setIsValidCategoryName] = useState(false)
    const [showValidation, setShowValidation] = useState(false)
    if (!name)
        return (
            <MainLayout>
                <div>Ошибка: категория не найдена</div>
            </MainLayout>
        )
    const [categoryName, setCategoryName] = useState(name)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchQuestionsByCategory(name))
        return () => {
            dispatch(clearCurrentCategory())
            dispatch(clearQuestions())
        }
    }, [])

    const updateCategoryNameHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (!isValidCategoryName || !categoryName) return setShowValidation(true)
        await dispatch(updateCategory({...currentCategory, name: categoryName}))
        dispatch(fetchCategories())
        navigate("/categories/" + categoryName)
        exitEditModeHandler()
    }

    const exitEditModeHandler = () => {
        setShowValidation(false)
        setEditCategoryNameMode(false)
        setCategoryName(name)
    }
    return (
        <MainLayout>
            <div className={"flex items-end w-full py-4"}>
                <span className={"text-pale-foreground text-2xl"}>Категория:</span>
                {editCategoryNameMode
                    ? <form onSubmit={updateCategoryNameHandler}
                            className={"ml-2 flex items-center justify-center w-full gap-2"}>
                        <ValidatedInput
                            setIsValid={setIsValidCategoryName}
                            showValidation={showValidation}
                            validateFunc={createValidateInputValueFunc()}
                            value={categoryName}
                            isValid={isValidCategoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <PrimaryButton
                            variant={"safe"}
                            type={"reset"}
                            className={"flex items-center justify-center gap-1 w-auto"}
                            onClick={exitEditModeHandler}
                        >
                            <NoSymbolIcon className={"w-5 h-5"}/>
                            <span>Отменить</span>
                        </PrimaryButton>
                        <SecondaryButton
                            className={"flex items-center justify-center gap-1 w-auto"}
                            type={"submit"}
                        >
                            <CheckIcon className={"w-5 h-5"}/>
                            <span>Сохранить</span>
                        </SecondaryButton>

                    </form>
                    : <div className={"flex items-center"}>
                        <div>
                            <span className={"ml-2 break-all text-3xl"}>{name}</span>
                        </div>

                        <div
                            className={"ml-2 cursor-pointer hover:text-primary-foreground/50 p-1 rounded-full duration-150"}
                            onClick={() => setEditCategoryNameMode(true)}
                        >
                            <PencilSquareIcon
                                className={"w-5 h-5"}/>
                        </div>
                    </div>
                }
            </div>
            <div className={"mt-4 flex items-start"}>
                <Sidebar><QuestionsForm categoryName={name}/></Sidebar>
                <div className={"flex-1"}>
                    <QuestionsList/>
                </div>
            </div>
        </MainLayout>
    );
}

export default CategoryName
