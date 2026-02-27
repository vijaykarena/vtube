import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_API } from "../utils/constant";
import type { RootState } from "../utils/store";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();

  const searchCache = useSelector((state: RootState) => state.search);

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    console.log(json);
    setSuggestions(json[1]);

    dispatch(cacheResults({ [searchQuery]: json[1] }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const searchHandler = (s: string) => {
    setSearchQuery(s);
  };

  return (
    <div className="grid grid-flow-col p-4 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={toggleMenuHandler}
          className="h-8 cursor-pointer"
          src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-45/hamburger-menu-4.png"
          alt="menu"
        />
        <a href="">
          <img
            className="h-8 mx-2"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVsAAACRCAMAAABaFeu5AAAAwFBMVEX////NIB8AAADKAADMGBfNHRz//PzWUVH23d3LCwjjlZUlJSWnp6fLDw3i4uLvx8ZycnLPKSfghoY9PT3no6OPj49oaGjZZmXvwsGcnJxPT0/66+uvr6/pqan99/f55+fz0tLprq7WVFPz8/PsurrXXFvSPDvhi4vX19fAwMAeHh6Hh4e3t7fbbm6WlpZ/f3/efX3QMjEuLi7Ly8vUSEjYYWDbc3JcXFxHR0fUSUlra2sUFBTgiYjefn1eXl7d3d0uRZoKAAAOg0lEQVR4nO2d/XuaOhTH9YaouDKnpdPNqWh9Wbfa6qZuvVt3////6oIinJOcBPClkM7vD32eQozwMYTknJOTUulVqdLv97uBBrWa56vRaHQ6nfFWw0A9X27wZ/vf7oRfwi8XFK/VBttP+7VU8r6VnOQTHNR8buOhW6/PWs+b9qS6mi6bZW45NktUmiKOY5WbzeV0NVrPN61Zve4Oxz7/2sCn/uqwD7xOz51t2qPVtOkACD4Fn4MvvlX5VNpVF1Rs+V9gg9/D5stVdb2Zub2ON8gby7Hy3Pkyak1biCcjeCD2LfAd7mbb9fIGdKi8jX8PVs40NeKWD3jeyBvTARoumVNcrntxhzV7eaPKqE6TFR/sTpzxYd64Mqg/MYZsIM6q3byRpZVnO3njyiiLdfKGlk5DoxrtTpy5eWNLozrLG9RBYrO8wSXLULQmwO2YitaHW/DhQtfAvjYSK/Y8eGLaCAHKesobn04Nc3uEQGycN0CNplbeeI4Sb+YNUC2DX2Q7FbjhVs1utn6PO80boUo105ut33C9vCEqNLPzRnO0nEXeEBUqsB08rbhTTJeaZ36X4HcKoR/itgJF3S4qcHtmtjM4bwjcgGmV5d45/OAZnhPneXcz/yDdyHd7hUucubkvwa1ak9azr1YqZRhd8OUs/txseXq4vLy7mRtE7lq+2z+owPvzou3CLiGT3SNDX2KN4AdHZxjzsdq26s+4WcrPPD5/fxS6RI0R2wwOvn4WtlX4yXOMp/et4hdidydedCL7k6oF+01z2TqbXd1fEbtH8aI/oNMfj0OXKGRLMJftvsPFDfONeNE/0elPx6HLRshctmUW+nzxQ/8WX/Pti3YJ3qth6+0qf9S1zO/oJDGMOKnGr4ZteOkYnzDIwr3xh2PhJahuUxeYRgVja9fD2vFjj6/5m67DOLnQMMFkts48rP1fxO8/+MW4u/12NLwErdF9Gsw2mp7cqZ/7e3SKmBGfVlM0/zSYLV+GtVcQQDSEfYdOfT4aXoKwgTHLnLdSMLaRmRGbDOAXf9F0xaeX0PicVrASJBYuO0bnxhkMYS/Atsz6YfX4yf8ef+9bdEKas51aXaHxgYUNgZAJriYs/8hw3y/CthZWj99YoFf9pIJ+Hml9ZbxcSV1Wrxdh6+3rRxNbMEFQdxZnkTbqwzC2UQ+G7d/xxBYd/vfsbMeviG00xsH9amSjxWYcyfx4cvXyYPt0FrbRxEyYfr3bH8X2xfM7L+s6/7lZbJ3f0Rc8QIhf9kdRN/zj7GhLC91AyjC2m+gL/kMtdG82oHuK82muu80XYMu5lWbRZZrVrdAn9wZiDO2M2EBGmG4rt58/f/98Opuu1i2oZcuhFMcT2HLG+HQ1dZh2FhIsg3SazWBNsa29WhAUhmyJf4hjP0UQd49RJ339lR763vz8GOln3O7fXseHP8KuZqprDTq2KOAARBygAIcIBcXWYkt3EHxBxWsxFTQf/8j1usGUq99tuE9M/X6AkaJ4SLA7dg0PXSFqt9j1/g9t2n1HV4BGJV9A+fKBbIWQ1+gMDnqL3pQEW7YES3K7Vbq/YY7bh58sdWfKRs45KIdAbY0yeLaGTLd4vhZK7pDTsIUOOm0XeghbtIZZzZazOqqgNCeuRCoUqL9RrM3gDvgZEIdtI0RWBmS6xQbfSFJciCFsLdsTr1wePFjlmlhoq44CLgNskRH3o0TmAVT3kUYru9MystXbYM/G1uHyQlzRalR2pn2p0E4Dh+yeGawUUQpuA9kXgTfivQqt9MLLyHaQC9uVRVETwoCtlYKsr65NtVy0Fgoh+64mgCdrgrAZMiNb/ZD1bGzJBWG44fKyqtUGIuNaGexCUPf6VXhffaXByEKDMSPYKtbatVGED93X7uUSF47GKGhY8E2wL8beHGVnG30wVka2+rjmc7FVaAjqt5NW6a7kLhd/N6J2i/vfqJAQeicLWstMZgs6fzSeIkVcOf5uZMS9RxaGyDImOCcJQVdmRrb6BZEvzBb4RRObLbXeECeqQLf8iEjHjVEg+fjp01ccZArtDhnZak3jZ2XbabXnwpwLxEowPEbzZvP2xsXHhtKlCyv44Bz3zQ8IICqCzTehJwLHNYGAMkPYjjlzLIcJL6xo5YWw+nnObCsojdqlPDQX2CIjLlQ84UJmhGg0ixgC109GtvKP/yJs5+HMSljPGF2Njea6+zEBx61Z6hSE4ApsxAWKLQXIWh7NJ7DlwTC2a4VpJ+r98eFoooDNC79Fo40YuKJiSzsnwXDrB13aCLaxLxI30OgLoGUAfC2uRerPxIAr3HFGil/9qIGCORiaq8Vj4Yxsta7IF2BrzeHx/SAMVx4z5Jbqcki2+E0VKX47odEtsNiiOV3cg5jGFhkN9q8nqw2PgikYivORXmZSoCDNNn7IkbEMDAjQjxJDNIwtXY0zIysRh2ZNwWAjsSVnBsByiGwMKrY3dHUGsLWoanBCNSVb0R8lscWRuKHAs4/61SvF5+J+2DS2Dsl2TFYishXDcyS2OBI3FPDmoBGwKiZPMUE2lm2HrERkO0liKwTXbQWdhWjqoGIbTx7+JrbrRLaEkxEG4qdiG8/iXgdbuhKRbTuRrbBULxAMxL+wPYItjkkI9AuevbCtsyhOJzNbyRuGPGAXtsewldxhyAF2YatMQJOCLQ66+0cIxL+wVSoNWyHQ65365IUtVBq2grMRB+Jf2Colxg6Tizqx+wufu7BVKhVbPArD5y5slbqw/WvZ5u3TubANVXi21CL6C1tczetgm0/sRza2w3WblpjWkcyMfWGrY1tnFi0xvrlgbPVZ3M+4liQL27RppclNofJjm0+M6IWteWypV2B+bPOJyT8XW+/C9mxsqSUS+bHNZw3U4WzRBtXSOIFao5IfW2nBXLHZ2vWeG6m3Ese31M6c+bHNbT3vYWwT/GUXtidjK8Z+2NTanqPZHhxXo9+TJDe2B8UsoTX+kXRsUTyYKv724HiwknarhYKzFXKW0LuY6dii6AVVjOjBcYz6VF0vwJaOEU0XxyhkBYgSiSLp2KL2qWIbpwPIylZ8H7w0W7IaHH8L48Z18bf0+kAd2zsalup4VrabA3NYKdnSj7OKrbCQLKzGacGDQxVboT/Dkfx76diiVVKqd1nsdlewRb02ZDs7LVuOMyMksgU5vUpgvcMaHgU2D7R+pyK8h/EvspeOLQpzBBmSUKr9OI0FzRavWIFsqbXyR7AVpvSJbPHTv5/J4F44zmG83x9jJ3EtiU0kt9GzxRFN8WGUIiRhfZkQhgrZap06mdmKXhUF23hFI/4tohm4YqyFd9cT5+v0tvNatig5SNQS7xSwKLa3wtJqyFZrHNexxYPJ3RkpLZKCrbdPB2bhV3v09OOBQnwYGQzES6c3O9Wyxclcw5UQuCWCoFLUVewSur0V0CK2B+cWZugi147/IMs+bNV63u6IBZ2lJXQhkYcJd8OBV4cH9eOGKb4qaA+mlq3wQG+X6d1hXCCo9EEsfCsnu4FstYaw9GwHS8YmsolPvca/0bYYW3n4YNT5c5yMu9R5spldFdhJy8vILCxatlJc+fVP4QD8hLh64otYVmCrTWKlZStM3rvUZF6bm0L+RJzUVHq++1JpeckpZapJYEuuQIO6yVJYYFvSbd6oZavP1bNTxrwfYE5BzrGQpJG50NZD6dkKm8DIgllFE3IyyWx1BgUtW8rxJyobW7hhROJGE1JnptgUPYGtYj31XjjlJV0GvRARW12SVh1bejRZqqWZ8yry/EDHaGIyIOm6hSneXglsVYkAdhIS25EJr+7RCxGx1SVu1rHFu2vu1U1lT5jQ3NClOGT9keQ5Dz3lTWSLE1Fg/RLyDF8RZT6p7QlaT582t7D4MgvUbaaLqyG3hu9jBxgjp7ChiPxQIN04VCJbdfo1ES21FPBeY6vRTsz0bOWIzK4/Yk3DdsSeiPfOszheVeex8ohMovS0LAVbVY7Wazk7tpSCOBj9qtnqoj8ScmKLfGq2lc7GOLKcpTRgki+EbcQyocgkrYqXawq2dG5hcgcuXNuOvpqtboCrz+XuoHwoQQw6Tx9rZ4koagQve0kN9CoL8pJJD7o4yCKL+A873mTS1x/FnnxwbhEOIhBbtKZVNwjDdidptM6ewcnBZHtWxVbaV5qzOWy6YzJfsMXmIrFKj5NvCM5KpK4+AD3QZUrB9BX8CL9u1LsdftpPiR/2XcbtA/gGnMdcax13oSRbL5vuSdYWofnFeYYRBJEnlk/h4Z3DwGEbL/x4Y6RIxewXqvZivP3Gs6MoiW2+h+j27sPj+/fvPtwnbCP59v7qKqlMKO1yEhTHIv8IFrPmdbe+Kcfn0CZdYB8HKiDGLztZtBYTpkyTX95tQfA0X7Ram3XTvwbVU6Z4leWrI3bECJg5NrN18+aEj1twpwKlrO3OBlp/Pxlol7u0l2yKuH3+vYcOkLbDNUWKWVne0sflGyLa6ZC7suxXWlhRM/AiaG5+p3D8COxM0i96MEKprMm5SBtwZ4KEsLIiSb8a3QBRexoVRJXDB/+FEC/qmyyQNnKp+Cpwsy0Z3uMKptCiyeihQnEHCTvNzIWLzMiF1NpUuHaqsJJ8NTETrglo6d0wCy82yRtbOrk6838hxbVBDIVSbapyWxVTjl3wEQJST17dXVhZbF7g6Rgld6n29xVI3GHrNFGqBZP3HPhTC+xF45bNeMtAslvVhovpzm1u8cIw5tyynK1Tf1T38iZ0pLre2F2MlnGIgm07zi4xV6BzQuQBx8BxboMACT4dtRfusKHYgdZMdQc1rzMeuvV6a9OejKqr6bLJUYwHwB/8ADuBJGkhq1j7MrZty5U4vLmcPlUn7U2r7rrDccOrDbqFNsecVpVKpd/v+9Rrnuc1Gg2f/bDn+vjrs9nvVut5sZm322v/h6iuVtOtVtPV6qk6Gk0m6/Z8s3hutX7PZn55tzccjjt+FZ5X8xn6tVb+Io7m6H9SEX7dDd2OoQAAAABJRU5ErkJggg=="
            alt="youtube_logo"
          />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">
            🔍
          </button>
        </div>
        {showSuggestions && (
          <div className="absolute bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestions.map((s) => (
                <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100" onMouseDown={() => searchHandler(s)}>
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRPx77U9mERU_T1zyHcz9BOxbDQrL4Dvtg&s"
          alt="user"
        />
      </div>
    </div>
  );
};

export default Head;
