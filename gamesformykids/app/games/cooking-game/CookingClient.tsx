'use client';
import { useCookingGame } from './useCookingGame';

export default function CookingClient() {
  const {
    phase, recipeIdx, stepIdx, tapped, shelf, wrongFlash, score,
    setRecipeIdx, setStepIdx, setPhase,
    startGame, beginStep, handleIngredientTap,
    recipe, step,
    RECIPES, INGREDIENTS, ingredientLabel, countWord,
  } = useCookingGame();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <div className="text-7xl mb-4">👨‍🍳</div>
          <h1 className="text-4xl font-bold text-orange-800 mb-2">המטבח של ילדים</h1>
          <p className="text-orange-600 text-lg">בשל מנות עבריות — תקשיב להוראות!</p>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-8 max-w-xs">
          {RECIPES.map(r => (
            <div key={r.name} className="bg-white rounded-2xl p-3 text-center shadow border border-orange-100">
              <div className="text-3xl">{r.emoji}</div>
              <p className="text-xs font-bold text-gray-700 mt-1">{r.name}</p>
            </div>
          ))}
        </div>
        <div className="bg-white/80 rounded-2xl p-4 mb-6 text-sm text-orange-800 space-y-1 max-w-xs w-full text-center">
          <p>👂 הקשב להוראה</p>
          <p>👆 לחץ על המרכיב הנכון</p>
          <p>🔢 לחץ את הכמות הנכונה</p>
        </div>
        <button
          onClick={startGame}
          className="bg-gradient-to-r from-orange-400 to-red-400 text-white font-bold text-xl px-10 py-4 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          בואו נבשל! 👨‍🍳
        </button>
      </div>
    );
  }

  if (phase === 'recipe-done') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 text-center max-w-sm w-full shadow-xl">
          <div className="text-7xl mb-4">{recipe?.emoji}</div>
          <h2 className="text-2xl font-bold text-orange-800 mb-1">המנה מוכנה!</h2>
          <p className="text-3xl font-bold text-orange-600 mb-4">{recipe?.name}</p>
          <div className="text-4xl font-bold text-yellow-500 mb-1">{score}</div>
          <p className="text-gray-500 text-sm mb-6">נקודות</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                const next = (recipeIdx + 1) % RECIPES.length;
                setRecipeIdx(next);
                setStepIdx(0);
                setPhase('cooking');
                beginStep(next, 0);
              }}
              className="bg-orange-400 text-white font-bold px-5 py-3 rounded-xl hover:bg-orange-500 transition"
            >
              מנה הבאה →
            </button>
            <button
              onClick={() => setPhase('menu')}
              className="bg-gray-200 text-gray-700 font-bold px-5 py-3 rounded-xl hover:bg-gray-300 transition"
            >
              תפריט
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Cooking / step-done
  const stepDone = phase === 'step-done';
  const progress = recipe ? `${stepIdx + 1}/${recipe.steps.length}` : '';

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-yellow-50 transition-all ${wrongFlash ? 'bg-red-100' : ''}`}>
      <div className="flex items-center justify-between p-3 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{recipe?.emoji}</span>
          <span className="font-bold text-orange-800">{recipe?.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">שלב {progress}</span>
          <span className="bg-yellow-400 text-gray-800 font-bold px-3 py-1 rounded-full text-sm">{score}</span>
        </div>
      </div>

      <div className="flex justify-center gap-2 py-2">
        {recipe?.steps.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${i < stepIdx ? 'bg-green-400' : i === stepIdx ? 'bg-orange-400 scale-125' : 'bg-gray-200'}`}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="relative w-48 h-48 mb-4">
          <div className="absolute inset-0 rounded-full bg-white border-4 border-gray-200 shadow-inner flex items-center justify-center">
            <div className="flex flex-wrap gap-1 justify-center p-4 max-w-full">
              {recipe?.steps.slice(0, stepIdx + (stepDone ? 1 : 0)).map((s, i) => {
                const ing = INGREDIENTS[s.ingredient];
                return (
                  <span key={i} className="text-2xl">
                    {ing?.emoji ?? '?'}
                  </span>
                );
              })}
            </div>
          </div>
          {stepDone && (
            <div className="absolute -top-2 -right-2 bg-green-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
              ✓
            </div>
          )}
        </div>

        {step && (
          <div className={`bg-white rounded-2xl p-4 text-center shadow-md w-full max-w-xs mb-4 transition-all ${stepDone ? 'border-2 border-green-400' : wrongFlash ? 'border-2 border-red-400' : 'border-2 border-transparent'}`}>
            {stepDone ? (
              <p className="text-green-600 font-bold text-xl">✅ {ingredientLabel(step.ingredient, step.count)} נוספו!</p>
            ) : (
              <>
                <p className="text-gray-500 text-sm mb-1">הוסף לסיר:</p>
                <p className="text-2xl font-bold text-orange-700">
                  {step.count} {ingredientLabel(step.ingredient, step.count)}
                  {' '}<span className="text-3xl">{INGREDIENTS[step.ingredient]?.emoji}</span>
                </p>
                {tapped > 0 && (
                  <div className="flex justify-center gap-1 mt-2">
                    {Array.from({ length: step.count }, (_, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full border-2 ${i < tapped ? 'bg-orange-400 border-orange-500' : 'bg-gray-100 border-gray-300'}`}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {!stepDone && (
        <div className="bg-white border-t border-gray-200 p-3">
          <p className="text-center text-sm text-gray-500 mb-2">מה נוסיף?</p>
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            {shelf.map(key => {
              const ing = INGREDIENTS[key];
              if (!ing) return null;
              return (
                <button
                  key={key}
                  onClick={() => handleIngredientTap(key)}
                  className={`flex flex-col items-center p-3 rounded-2xl font-bold text-sm transition-all active:scale-95 ${wrongFlash ? 'bg-red-100' : 'bg-orange-50 hover:bg-orange-100'} border-2 border-orange-200`}
                >
                  <span className="text-3xl mb-1">{ing.emoji}</span>
                  <span className="text-xs text-gray-700">{ing.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
