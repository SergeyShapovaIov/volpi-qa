import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {render, RenderResult, screen} from "@testing-library/react";
import {PrimaryButton} from "./PrimaryButton";
import userEvent from "@testing-library/user-event";

describe("PrimaryButton", () => {
    const buttonTestID = "skjajslkdfhasdf"
    let buttonElement: HTMLButtonElement
    const buttonTitle = "42"
    let renderOption: RenderResult
    const buttonOnClick = vi.fn()
    const buttonOnHover = vi.fn()
    const buttonOnBlur = vi.fn()

    describe("default behaviour", () => {
        beforeEach(() => {
            renderOption = render(
                <PrimaryButton
                    data-testid={buttonTestID}
                >
                    {buttonTitle}
                </PrimaryButton>)
            buttonElement = screen.getByTestId(buttonTestID)
        })

        it("renders correctly with default and additional classes", () => {
            expect(buttonElement).toHaveClass("bg-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-600 w-full max-w-[250px]")
            renderOption.rerender(
                <PrimaryButton
                    data-testid={buttonTestID}
                    className={"bg-neutral-900 text-neutral-400"}
                >
                    {buttonTitle}
                </PrimaryButton>
            )
            expect(buttonElement).toHaveClass("bg-neutral-900 text-neutral-400")
        })

        it("renders correctly default title", () => {
            expect(buttonElement).toHaveTextContent(buttonTitle)
        })
    })
    describe("user iteraction", () => {
        beforeEach(() => {
            render(
                <PrimaryButton
                    data-testid={buttonTestID}
                    onClick={buttonOnClick}
                    onMouseLeave={buttonOnBlur}
                    onMouseEnter={buttonOnHover}
                >
                    {buttonTitle}
                </PrimaryButton>)
            buttonElement = screen.getByTestId(buttonTestID)
        })

        afterEach(() => {
            vi.clearAllMocks()
        })

        it("handle click correctly", async () => {
            await userEvent.click(buttonElement)
            expect(buttonOnClick).toHaveBeenCalledOnce()
        })

        it("hover and blur effects works correctly", async () => {
            await userEvent.hover(buttonElement)
            expect(buttonOnHover).toHaveBeenCalledOnce()
            expect(buttonOnBlur).not.toBeCalled()

            await userEvent.unhover(buttonElement)
            expect(buttonOnBlur).toHaveBeenCalledOnce()
        })
    })
})
